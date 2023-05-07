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
                    ["restartdate", "startDate"],
                    ["resdatemod", "startDateModifier"],
                    ["restart", "startDateISOString"],
                    ["reenddate", "endDate"],
                    ["reedatemod", "endDateModifer"],
                    ["reend", "endDateISOString"],
                    ["redatequal", "dateQualifier"],
                    ["renote", "processingNotes"],
                    ["rerating", "relationshipStrength"],
                    ["reappenddate", "recordAppendDate"],
                    ["relastmodd", "recordLastModified"],
                    "reorder",
                ];
                const relationship = {
                    "@id": `#${encodeURIComponent(row.eid)}-${encodeURIComponent(row.reid)}`,
                    "@type": ["Relationship", row.rerelationship.replace(/\s/g, "_")],
                    identifier: `${row.eid}-${row.reid}`,
                    name: row.rerelationship,
                    description: row.redescription,
                    source: { "@id": `#${encodeURIComponent(row.reid)}` },
                    target: { "@id": `#${encodeURIComponent(row.eid)}` },
                };
                if (row.reprepared) {
                    rows.push({
                        "@id": `#${encodeURIComponent(row.reprepared)}`,
                        "@type": "Person",
                        name: row.reprepared,
                    });
                    relationship.preparedBy = { "@id": `#${encodeURIComponent(row.reprepared)}` };
                }
                mapEntityProperties(row, relationship, properties);
                rows.push(relationship);
            }
            offset += pageSize;
        }
        return rows;
    }
}
