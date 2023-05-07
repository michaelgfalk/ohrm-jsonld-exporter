// relationship table
import { pageSize, mapEntityProperties } from "./config.js";
import { extractEntity } from "./common.js";

export class EntityArchivalRelationship {
    constructor() {}

    async export({ models }) {
        let offset = 0;
        let rows = [];
        let total = await models.earrship.count();
        while (offset <= total) {
            for (let row of await models.earrship.findAll({ limit: pageSize, offset })) {
                // console.log(row.get());
                const properties = [
                    ["earstartdate", "startDate"],
                    ["earsdatemod", "startDateModifier"],
                    ["earstart", "startDateISOString"],
                    ["earenddate", "endDate"],
                    ["earedatemod", "endDateModifer"],
                    ["earend", "endDateISOString"],
                    ["redatequal", "dateQualifier"],
                    ["earcitation", "citation"],
                    ["earappenddate", "recordAppendDate"],
                    ["earlastmodd", "recordLastModified"],
                    "earereference",
                ];
                const relationship = {
                    "@id": `#${encodeURIComponent(row.arcid)}-${encodeURIComponent(row.eid)}`,
                    "@type": ["Relationship", row.relationship.replace(/\s/g, "_")],
                    identifier: `${row.arcid}-${row.eid}`,
                    description: row.description,
                    source: { "@id": `#${encodeURIComponent(row.arcid)}` },
                    target: { "@id": `#${encodeURIComponent(row.eid)}` },
                };
                if (row.earprepared) {
                    rows.push({
                        "@id": `#${encodeURIComponent(row.earprepared)}`,
                        "@type": "Person",
                        name: row.earprepared,
                    });
                    relationship.preparedBy = { "@id": `#${encodeURIComponent(row.earprepared)}` };
                }
                mapEntityProperties(row, relationship, properties);

                extractEntity({
                    rows,
                    entity: relationship,
                    type: "Place",
                    value: row.earplace,
                    property: "place",
                });
                rows.push(relationship);
            }
            offset += pageSize;
        }
        return rows;
    }
}
