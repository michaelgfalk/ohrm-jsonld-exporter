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
                if (!row.arcid) continue;
                if (!row.eid) continue;
                const relationship = {
                    "@id": `#${encodeURIComponent(row.arcid)}-${encodeURIComponent(row.eid)}`,
                    "@type": ["Relationship", row.relationship.replace(/\s/g, "_")],
                    identifier: `${row.arcid}-${row.eid}`,
                    description: row.description,
                    source: { "@id": `#${encodeURIComponent(row.arcid)}` },
                    target: { "@id": `#${encodeURIComponent(row.eid)}` },
                };
                mapEntityProperties(row, relationship, properties);

                let extractEntities = [
                    { type: "Person", value: row.earprepared, property: "preparedBy" },
                    { type: "Place", value: row.earplace, property: "place" },
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
