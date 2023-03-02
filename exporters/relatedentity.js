import { pageSize, mapEntityProperties } from "./config.js";

export class RelatedEntity {
    constructor() {}

    async export({ models }) {
        let offset = 0;
        let rows = [];
        let total = await models.relatedentity.count();
        while (offset <= total) {
            for (let row of await models.relatedentity.findAll({ limit: pageSize, offset })) {
                // console.log(row.get());
                const properties = [
                    "restartdate",
                    "resdatemod",
                    "restart",
                    "reenddate",
                    "reedatemod",
                    "reend",
                    "redatequal",
                    "renote",
                    "rerating",
                    "reappenddate",
                    "relastmodd",
                    "reprepared",
                    "reorder",
                ];
                const relationship = {
                    "@id": `#${encodeURIComponent(row.eid)}-${encodeURIComponent(row.reid)}`,
                    "@type": ["Relationship", row.rerelationship],
                    identifier: `${row.eid}-${row.reid}`,
                    name: row.rerelationship,
                    description: row.redescription,
                    relationshipObject: { "@id": `#${encodeURIComponent(row.reid)}` },
                    relationshipSubject: { "@id": `#${encodeURIComponent(row.eid)}` },
                };
                mapEntityProperties(row, relationship, properties);
                rows.push(relationship);
            }
            offset += pageSize;
        }
        return rows;
    }
}
