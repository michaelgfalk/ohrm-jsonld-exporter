// relationship table
import { pageSize, mapEntityProperties } from "./config.js";
import { extractEntity } from "./common.js";

export class EntityFunctionRelationship {
    constructor() {}

    async export({ models }) {
        let offset = 0;
        let rows = [];
        let total = await models.efrship.count();
        while (offset <= total) {
            for (let row of await models.efrship.findAll({ limit: pageSize, offset })) {
                // console.log(row.get());
                const properties = [
                    "rating",
                    ["efstartdate", "startDate"],
                    ["efsdatemod", "startDateModifier"],
                    ["efstart", "startDateISOString"],
                    ["efenddate", "endDate"],
                    ["efedatemod", "endDateModifer"],
                    ["efend", "endDateISOString"],
                    ["efcitation", "citation"],
                    ["efnote", "processingNotes"],
                    ["efappenddate", "recordAppendDate"],
                    ["eflastmodd", "recordLastModified"],
                    "ordering",
                ];
                const relationship = {
                    "@id": `#${encodeURIComponent(row.eid)}-${encodeURIComponent(row.fid)}`,
                    "@type": ["Relationship"],
                    identifier: `${row.eid}-${row.fid}`,
                    description: row.description,
                    source: { "@id": `#${encodeURIComponent(row.eid)}` },
                    target: { "@id": `#${encodeURIComponent(row.fid)}` },
                };
                if (row.efprepared) {
                    rows.push({
                        "@id": `#${encodeURIComponent(row.efprepared)}`,
                        "@type": "Person",
                        name: row.efprepared,
                    });
                    relationship.preparedBy = { "@id": `#${encodeURIComponent(row.efprepared)}` };
                }
                mapEntityProperties(row, relationship, properties);

                extractEntity({
                    rows,
                    entity: relationship,
                    type: "Place",
                    value: row.efplace,
                    property: "place",
                });
                extractEntity({
                    rows,
                    entity: relationship,
                    type: "State",
                    value: row.efplacestate,
                    property: "state",
                });
                extractEntity({
                    rows,
                    entity: relationship,
                    type: "Country",
                    value: row.efplacecountry,
                    property: "country",
                });
                rows.push(relationship);
            }
            offset += pageSize;
        }
        return rows;
    }
}
