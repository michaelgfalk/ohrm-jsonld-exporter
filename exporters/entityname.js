import { pageSize, mapEntityProperties } from "./config.js";
import { extractEntity } from "./common.js";

export class Entity {
    constructor() {}

    async export({ models }) {
        let offset = 0;
        let rows = [];
        let total = await models.entityname.count();
        while (offset <= total) {
            for (let row of await models.entityname.findAll({ limit: pageSize, offset })) {
                const properties = [
                    ["enstatedate", "startDate"],
                    ["ensdatemod", "dateModifier"],
                    ["enstart", "startDateISOString"],
                    ["enenddate", "endDate"],
                    ["enedatemod", "endDateModifier"],
                    ["enend", "endDateISOString"],
                    ["endatequal", "dateQualifier"],
                    ["ennote", "processingNotes"],
                ];

                const entity = {
                    "@id": `#${encodeURIComponent(row.eid)}_alsoKnownAs`,
                    "@type": [type, row.enalternatetype],
                    name: row.enalternate,
                    alsoKnownAs: { "@id": `#${encodeURIComponent(row.eid)}` },
                };

                mapEntityProperties(row, entity, properties);

                extractEntity({
                    rows,
                    entity,
                    type: "Place",
                    value: row.enplace,
                    property: "place",
                });

                // push the entity definition into the graph
                rows.push(entity);
            }
            offset += pageSize;
        }
        return rows;
    }
}
