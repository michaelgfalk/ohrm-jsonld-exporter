import path from "path";
import fsExtraPkg from "fs-extra";
const { ensureDir, writeJSON } = fsExtraPkg;
import { Sequelize } from "sequelize";
import initModels from "./models/init-models.js";

import {
    ArcResource,
    DObject,
    DObjectVersion,
    EntityArchivalRelationship,
    EntityDobjectRelationship,
    EntityFunctionRelationship,
    Entity,
    EntityEvent,
    EntityName,
    Function,
    PubResource,
    RelatedEntity,
    RelatedResource,
} from "./exporters/index.js";

import lodashPkg from "lodash";
const { isArray, union, clone, uniqBy } = lodashPkg;
import { ROCrate } from "ro-crate";
import * as configuration from "./configuration.js";
import yargs from "yargs/yargs";
import html from "./models/html.js";

const argv = yargs(process.argv.slice(2))
    .scriptName("ohrm-jsonld-converter")
    .usage("Usage: $0 -o output path -d database")
    .option("o", {
        alias: "output-path",
        describe: "A path to output the JSON-LD files",
        type: "string"
    })
    .option("d", {
        alias: "database",
        describe: "The name of the Postgres database with the OHRM data",
        type: "string"
    })

    .help().argv;

main();
async function main() {
    let sequelize = new Sequelize(
        argv.database,
        configuration.databaseConfig.username,
        configuration.databaseConfig.password,
        {
            host: configuration.databaseConfig.host,
            dialect: "postgres",
            logging: false,
        }
    );
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error(`Unable to connect to the database:`, error);
    }
    let models = initModels(sequelize);

    if (argv.outputPath) await ensureDir(argv.outputPath);


    const crate = new ROCrate({ array: true, link: true });
    // the name property is where those entities will be attached to the root dataset
    //   so for example: ArchivalResources will be at crate.rootDataset.archivalResource

    // TODO: (ptsefton) This might be better done with a generic hasPart relationship -- avoid a lot of extra props
    //  Included initially so that the data can be demonstrated with Describo and there would
    //   be entry points to each type of data from the root dataset.
    const resources = [
        { obj: ArcResource, name: "archivalResources" },
        { obj: DObject, name: "digitalObjects" },
        { obj: DObjectVersion, name: "digitalObjectVersions" },
        { obj: EntityArchivalRelationship, name: "entityArchivalRelationships" },
        { obj: EntityDobjectRelationship, name: "entityDobjectRelationships" },
        { obj: EntityFunctionRelationship, name: "entityFunctionRelationships" },
        { obj: Entity, name: "entities" },
        { obj: EntityEvent, name: "entityEvent" },
        { obj: EntityName, name: "entityName" },
        { obj: Function, name: "entityFunction" },
        { obj: PubResource, name: "publishedResources" },
        { obj: RelatedEntity, name: "entityRelationships" },
        { obj: RelatedResource, name: "resourceRelationships" },
    ];

    const typeMaps = {
        Person: [],
        Place: [],
        State: [],
        Country: [],
        Nationality: [],
        Contact: [],
    };
    // set basic metadata of the root entity
    // this info is in the 'html' table of the database, if it is there at all...
    const rootDataset = crate.rootDataset;
    const rootMetaData = await models.html.findOne({
        attributes: ['title', 'creator','description']
    });
    rootDataset.title = rootMetaData.title ? rootMetaData.title : "OHRM Dataset";
    rootDataset.description = rootMetaData.description;
    rootDataset.creator = rootMetaData.creator;

    // run all the exporters
    let extractEntitiesOfType = Object.keys(typeMaps);
    for (let { obj, name } of resources) {
        let resource = new obj();
        let entities = await resource.export({ models });
        entities.forEach((entity) => {
            if (extractEntitiesOfType.includes(entity["@type"])) {
                typeMaps[entity["@type"]].push(entity);
            } else {
                crate.addEntity(entity);
            }
        });
        crate.rootDataset[name] = entities
            .filter((e) => !extractEntitiesOfType.includes(e["@type"]))
            .map((e) => ({ "@id": e["@id"] }));
    }

    for (let type of Object.keys(typeMaps)) {
        typeMaps[type] = uniqBy(typeMaps[type], "@id");
        typeMaps[type].forEach((entity) => {
            crate.addEntity(entity);
        });
        crate.rootDataset[type] = typeMaps[type].map((e) => ({ "@id": e["@id"] }));
    }

    // iterate over all entities of type Relationship and link the entity
    //   back to the related entities
    var i = 0;
    // PT: Added more informative names
    for (let entity of crate.entities()) {
        if (entity["@type"].includes("Relationship")) {
            var relationshipName = "";
            if (entity["@type"].length > 1) {
                entity["@type"] = entity["@type"].filter((x) => x != "Relationship");
            }
            try {
                let srcEntity = crate.getEntity(entity.source[0]["@id"]);
                crate.addValues(srcEntity, "sourceOf", entity, false);
                relationshipName += `${srcEntity.name} -> `;
            } catch (error) {
                // console.log(`Can't find source: ${entity.source[0]["@id"]}`);
                crate.deleteEntity(entity);
                continue;
                // relationshipsToRemove.push(entity);
            }
            relationshipName += `${entity["@type"]} -> `;
            try {
                let tgtEntity = crate.getEntity(entity.target[0]["@id"]);
                crate.addValues(tgtEntity, "targetOf", entity, false);
                relationshipName += `${tgtEntity.name}`;
            } catch (error) {
                // console.log(`Can't find target: ${entity.target[0]["@id"]}`);
                crate.deleteEntity(entity);
                continue;
            }
            entity.name = relationshipName;
        }
    }
    if (argv.outputPath) {
        await ensureDir(argv.outputPath);
        await writeJSON(path.join(argv.outputPath, "ro-crate-metadata.json"), crate, { spaces: 4 });
    } else {
        console.log(JSON.stringify(crate.toJSON(), null, 2));
    }

    await sequelize.close();
    process.exit();
}
