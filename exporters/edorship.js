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
                const relationship = {
                    "@id": `#${encodeURIComponent(row.doid)}-${encodeURIComponent(row.eid)}`,
                    "@type": ["Relationship", row.relationship.replace(/\s/g, "_")],
                    identifier: `${row.doid}-${row.eid}`,
                    description: row.description,
                    source: { "@id": `#${encodeURIComponent(row.doid)}` },
                    target: { "@id": `#${encodeURIComponent(row.eid)}` },
                };
                if (row.edoprepared) {
                    rows.push({
                        "@id": `#${encodeURIComponent(row.edoprepared)}`,
                        "@type": "Person",
                        name: row.edoprepared,
                    });
                    relationship.preparedBy = { "@id": `#${encodeURIComponent(row.edoprepared)}` };
                }
                mapEntityProperties(row, relationship, properties);

                extractEntity({
                    rows,
                    entity: relationship,
                    type: "Place",
                    value: row.edoplace,
                    property: "place",
                });
                rows.push(relationship);
            }
            offset += pageSize;
        }
        return rows;
    }
}
