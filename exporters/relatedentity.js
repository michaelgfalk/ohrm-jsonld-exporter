import { pageSize, mapEntityProperties } from "./config.js";
import { extractEntity } from "./common.js";

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
                if (!row.eid) continue;
                if (!row.reid) continue;
                const relationship = {
                    "@id": `#${encodeURIComponent(row.eid)}-${encodeURIComponent(row.reid)}`,
                    "@type": ["Relationship", row.rerelationship.replace(/\s/g, "_")],
                    identifier: `${row.eid}-${row.reid}`,
                    name: row.rerelationship,
                    description: row.redescription,
                    source: { "@id": `#${encodeURIComponent(row.reid)}` },
                    target: { "@id": `#${encodeURIComponent(row.eid)}` },
                };
                mapEntityProperties(row, relationship, properties);

                let extractEntities = [
                    { type: "Person", value: row.reprepared, property: "preparedBy" },
                ];
                for (let e of extractEntities) {
                    if (e.value) {
                        let d = extractEntity({
                            type: e.type,
                            value: e.value,
                        });
                        rows.push(d);
                        relationship[e.property] = { "@id": d["@id"] };
                    }
                }
                rows.push(relationship);
            }
            offset += pageSize;
        }
        return rows;
    }
}
