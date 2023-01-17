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
                    "ebthplace",
                    "ebthstate",
                    "ebthcountry",
                    "dthplace",
                    "edthstate",
                    "edthcountry",
                    "elocation",
                    "elegalstatus",
                    "enationality",
                    "efunction",
                    "esumnote",
                    "efullnote",
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

                const entity = {
                    "@id": `#${encodeURIComponent(row.eid)}`,
                    "@type": "Entity",
                    entityType: { "@id": `#${encodeURIComponent(row.etype)}` },
                    identifier: row.eid,
                    name: row.ename,
                };
                mapEntityProperties(row, entity, properties);
                if (row.eprepared) {
                    rows.push({
                        "@id": `#${encodeURIComponent(row.eprepared)}`,
                        "@type": "Person",
                        name: row.eprepared,
                    });
                    entity.eprepared = { "@id": `#${encodeURIComponent(row.eprepared)}` };
                }
                rows.push(entity);
            }
            offset += pageSize;
        }
        return rows;
    }
}
