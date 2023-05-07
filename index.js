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
    Function,
    PubResource,
    RelatedEntity,
    RelatedResource,
} from "./exporters/index.js";

import lodashPkg from "lodash";
const { isArray, union, clone } = lodashPkg;
import { ROCrate } from "ro-crate";
import * as configuration from "./configuration.js";
import yargs from "yargs/yargs";

const argv = yargs(process.argv.slice(2))
    .scriptName("ohrm-jsonld-converter")
    .usage("Usage: $0 -o output path")
    .option("o", {
        alias: "output-path",
        describe: "A path to output the JSON-LD files",
        type: "string",
    })
    
    .help().argv;




main();
async function main() {

   
    let sequelize = new Sequelize(
        configuration.databaseConfig.database,
        configuration.databaseConfig.username,
        configuration.databaseConfig.database,
        {
            host: configuration.databaseConfig.host,
            dialect: "postgres",
            logging: false,
        }
    );
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error(`Unable to connect to the database!`);
    }
    let models = initModels(sequelize);

    if (argv.outputPath) await ensureDir(argv.outputPath);

    const crate = new ROCrate({ array: true, link: true });
    const vocabCrate = new ROCrate({ array: true, link: true });
    //Hack -- need to sort out the additional RO-Crate vocab stuff
    vocabCrate.addContext({"RepositoryObject": "http://pcdm.org/2016/04/18/models#Object"})
    const schemaOrgCrate = new ROCrate({ array: true, link: true });


    









    // the name property is where those entities will be attached to the root dataset
    //   so for example: ArchivalResources will be at crate.rootDataset.archivalResource

    // TODO: (ptsefton) This might be better done with a generic hasPart relationship -- avoid a lot of extra props

    const resources = [
        { obj: ArcResource, name: "archivalResources" },
        { obj: DObject, name: "digitalObjects" },
        { obj: DObjectVersion, name: "digitalObjectVersions" },
        { obj: EntityArchivalRelationship, name: "entityArchivalRelationships" },
        { obj: EntityDobjectRelationship, name: "entityDobjectRelationships" },
        { obj: EntityFunctionRelationship, name: "entityFunctionRelationships" },
        { obj: Entity, name: "entities" },
        { obj: Function, name: "entityFunction" },
        { obj: PubResource, name: "publishedResources" },
        { obj: RelatedEntity, name: "entityRelationships" },
        { obj: RelatedResource, name: "resourceRelationships" },
    ];

    // run all the exporters
    for (let { obj, name } of resources) {
        let resource = new obj();
        let entities = await resource.export({ models });
        entities.forEach((entity) => crate.addEntity(entity));
        crate.rootDataset[name] = entities.map((e) => ({ "@id": e["@id"] }));
    }

    // iterate over all entities of type Relationship and link the entity
    //   back to the related entities
    var i =0;
    const propTargets = {};
    const extraContext = {};
    // PT: Added more informative names
    for (let entity of crate.entities()) {



        if (entity["@type"].includes("Relationship")) {
            var relationshipName = "";
            if (entity["@type"].length > 1) {
                entity["@type"] = entity["@type"].filter(x => x != "Relationship");
            }
            try {
                let srcEntity = crate.getEntity(entity.source[0]["@id"]);
                crate.addValues(srcEntity, "sourceOf", entity, false);
                relationshipName += `${srcEntity.name} -> `;
            } catch (error) {
                console.log(`Can't find source: ${entity.source[0]["@id"]}`);
            }
            relationshipName += `${entity["@type"]} -> `
            try {
                let tgtEntity = crate.getEntity(entity.target[0]["@id"]);
                crate.addValues(tgtEntity, "targetOf", entity, false);
                relationshipName += `${tgtEntity.name}`
            } catch (error) {
                console.log(`Can't find target: ${entity.target[0]["@id"]}`);
            }
            entity.name = relationshipName;
        }
        

    }
   

    // TODO -- put this in a crate utils function as it will be useful elsewhere 
    // Putting both loops here so it is easier to extract

    // Add links to titles 
    const nameIndex = {}
    for (let entity of crate.entities()) {
        for (let n of entity.name || []) {
            if (n) {
                nameIndex[n] = entity;  
            } 
        }
    }

    for (let entity of crate.entities()) {
        for (let p of Object.keys(entity)) {
            if (!p.startsWith("@") && !(p==="name")) {
                if (entity[p]) {
                    entity[p] = entity[p].map((v) => {
                        if (nameIndex[v]) {
                            //console.log("LInkin'", v)
                        }
                        return nameIndex[v] || v;
                    })
            }
            }
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
