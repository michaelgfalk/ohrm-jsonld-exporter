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
                if (!row.eid) continue;
                if (!row.fid) continue;
                const relationship = {
                    "@id": `#${encodeURIComponent(row.eid)}-${encodeURIComponent(row.fid)}`,
                    "@type": ["Relationship"],
                    identifier: `${row.eid}-${row.fid}`,
                    description: row.description,
                    source: { "@id": `#${encodeURIComponent(row.eid)}` },
                    target: { "@id": `#${encodeURIComponent(row.fid)}` },
                };
                mapEntityProperties(row, relationship, properties);

                let extractEntities = [
                    { type: "Person", value: row.efprepared, property: "preparedBy" },
                    { type: "Place", value: row.efplace, property: "place" },
                    { type: "State", value: row.efplacestate, property: "state" },
                    { type: "Country", value: row.efplacecountry, property: "country" },
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
