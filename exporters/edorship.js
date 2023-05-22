// relationship table
import { pageSize, mapEntityProperties } from "./config.js";
import { extractEntity } from "./common.js";

export class EntityDobjectRelationship {
    constructor() {}

    async export({ models }) {
        let offset = 0;
        let rows = [];
        let total = await models.edorship.count();
        while (offset <= total) {
            for (let row of await models.edorship.findAll({ limit: pageSize, offset })) {
                // console.log(row.get());
                const properties = [
                    ["edostartdate", "startDate"],
                    ["edosdatemod", "startDateModifier"],
                    ["edostart", "startDateISOString"],
                    ["edoenddate", "endDate"],
                    ["edoedatemod", "endDateModifer"],
                    ["edoend", "endDateISOString"],
                    ["edoitation", "citation"],
                    ["edoappenddate", "recordAppendDate"],
                    ["edolastmodd", "recordLastModified"],
                    "edoereference",
                    "edogallery",
                ];
                if (!row.doid) continue;
                if (!row.eid) continue;
                let relationship = {
                    "@id": `#${encodeURIComponent(row.doid)}-${encodeURIComponent(row.eid)}`,
                    "@type": ["Relationship", row.relationship.replace(/\s/g, "_")],
                    identifier: `${row.doid}-${row.eid}`,
                    description: row.description,
                    source: { "@id": `#${encodeURIComponent(row.doid)}` },
                    target: { "@id": `#${encodeURIComponent(row.eid)}` },
                };
                mapEntityProperties(row, relationship, properties);

                let extractEntities = [
                    { type: "Person", value: row.edoprepared, property: "preparedBy" },
                    { type: "Place", value: row.edoplace, property: "place" },
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
