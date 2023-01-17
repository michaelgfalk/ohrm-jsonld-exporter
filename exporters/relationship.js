import { pageSize } from "./config.js";

export class Relationship {
    constructor() {}

    async export({ models }) {
        let offset = 0;
        let rows = [];
        let total = await models.relationships.count();
        while (offset <= total) {
            for (let row of await models.relationships.findAll({ limit: pageSize, offset })) {
                // console.log(row.get());
                const properties = ["reltype", "relationshiplabel", "relorder", "relstatus"];
                const relationship = {
                    "@id": `#${encodeURIComponent(row.relationship)}`,
                    "@type": "RelationshipType",
                    name: row.relationship,
                    reverse: row.reverse,
                    description: row.notes,
                };
                properties.forEach((property) => {
                    if (row[property]) relationship[property] = row[property];
                });

                const reverse = {
                    "@id": `#${encodeURIComponent(row.reverse)}`,
                    "@type": "RelationshipType",
                    name: row.reverse,
                    reverse: row.relationship,
                    description: row.notes,
                };
                properties.forEach((property) => {
                    if (row[property]) reverse[property] = row[property];
                });
                rows.push(relationship);
                rows.push(reverse);
            }
            offset += pageSize;
        }
        return rows;
    }
}
