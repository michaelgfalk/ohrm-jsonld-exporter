import path from "path";
import fsExtraPkg from "fs-extra";
const { ensureDir, writeJSON } = fsExtraPkg;
import { Sequelize } from "sequelize";
import initModels from "./models/init-models.js";
import {
    ArcResource,
    DObject,
    DObjectVersion,
    Entity,
    PubResource,
    RelatedEntity,
    RelatedResource,
    Relationship,
    TypeOf,
} from "./exporters/index.js";

import lodashPkg from "lodash";
const { isArray, isPlainObject, groupBy } = lodashPkg;
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
        // "eoas",
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

    const crate = new ROCrate();

    const resources = [
        { obj: ArcResource, name: "archivalResources" },
        { obj: DObject, name: "digitalObjects" },
        { obj: DObjectVersion, name: "digitalObjectVersions" },
        { obj: Entity, name: "entities" },
        { obj: PubResource, name: "publishedResources" },
        { obj: RelatedEntity, name: "entityRelationships" },
        { obj: RelatedResource, name: "resourceRelationships" },
        { obj: Relationship, name: "relationships" },
        { obj: TypeOf, name: "types" },
    ];

    for (let { obj, name } of resources) {
        let resource = new obj();
        let entities = await resource.export({ models });
        entities.forEach((entity) => crate.addEntity(entity));
        crate.rootDataset[name] = entities.map((e) => ({ "@id": e["@id"] }));
    }

    for (let entity of crate.entities()) {
        if (entity["@type"] === "Relationship") {
            let srcEntity = crate.getEntity(entity.relationshipObject["@id"]);
            crate.addValues(srcEntity, "relationshipSubject", entity.relationshipSubject, false);

            let tgtEntity = crate.getEntity(entity.relationshipSubject["@id"]);
            crate.addValues(tgtEntity, "relationshipObject", entity.relationshipObject, false);
        }
    }

    if (argv.outputPath) {
        await ensureDir(argv.outputPath);
        await writeJSON(path.join(argv.outputPath, "ro-crate-metadata.json"), crate, {
            spaces: 4,
        });
    } else {
        console.log(crate.rootDataset.toJSON().entities);
    }

    await sequelize.close();
    process.exit();
}
