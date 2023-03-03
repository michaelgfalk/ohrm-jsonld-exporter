import { pageSize, mapEntityProperties } from "./config.js";
export class Entity {
    constructor() {}

    async export({ models }) {
        let offset = 0;
        let rows = [];
        let total = await models.entity.count();
        while (offset <= total) {
            for (let row of await models.entity.findAll({ limit: pageSize, offset })) {
                const properties = [
                    "ecountrycode",
                    "eorgcode",
                    "esubname",
                    "elegalno",
                    ["estartdate", "dateCreated"],
                    "esdatemod",
                    "estart",
                    "eenddate",
                    "eend",
                    "edatequal",
                    "elocation",
                    "elegalstatus",
                    "efunction",
                    ["esumnote", "summaryNote"],
                    ["efullnote", "fullNote"],
                    "egender",
                    "ereference",
                    "enote",
                    "eappenddate",
                    "elastmod",
                    "elogo",
                    "eurl",
                    "earchives",
                    "epub",
                    "eonline",
                    "egallery",
                    "eowner",
                    "erating",
                    "estatus",
                    "x_efunction",
                ];

                let type = row.etype.split("-").map((v) => v.trim());
                const entity = {
                    "@id": `#${encodeURIComponent(row.eid)}`,
                    "@type": type,
                    identifier: row.eid,
                    name: row.ename,
                };
                mapEntityProperties(row, entity, properties);

                // extract eprepared as a person entity
                extractEntity({
                    rows,
                    entity,
                    type: "Person",
                    value: row.eprepared,
                    property: "preparedBy",
                });
                extractEntity({
                    rows,
                    entity,
                    type: "Place",
                    value: row.ebthplace,
                    property: "birthPlace",
                });
                extractEntity({
                    rows,
                    entity,
                    type: "State",
                    value: row.ebthstate,
                    property: "birthState",
                });
                extractEntity({
                    rows,
                    entity,
                    type: "Country",
                    value: row.ebthcountry,
                    property: "birthCountry",
                });
                extractEntity({
                    rows,
                    entity,
                    type: "Place",
                    value: row.edthplace,
                    property: "deathPlace",
                });
                extractEntity({
                    rows,
                    entity,
                    type: "State",
                    value: row.edthstate,
                    property: "deathState",
                });
                extractEntity({
                    rows,
                    entity,
                    type: "Country",
                    value: row.edthcountry,
                    property: "deathCountry",
                });
                extractEntity({
                    rows,
                    entity,
                    type: "Nationality",
                    value: row.enationality,
                    property: "nationality",
                });

                // push the entity definition into the graph
                rows.push(entity);
            }
            offset += pageSize;
        }
        return rows;
    }
}

function extractEntity({ rows, entity, type, value, property }) {
    if (!value) return;
    let relatedEntity = {
        "@id": `#${encodeURIComponent(value)}`,
        "@type": type,
        name: value,
    };
    rows.push(relatedEntity);
    entity[property] = { "@id": `#${encodeURIComponent(value)}` };
}
