import { pageSize, mapEntityProperties } from "./config.js";
import { extractEntity } from "./common.js";

export class Entity {
    constructor() {}

    async export({ models }) {
        let offset = 0;
        let rows = [];
        let total = await models.entityevent.count();
        while (offset <= total) {
            for (let row of await models.entityevent.findAll({ limit: pageSize, offset })) {
                const properties = [
                    ["eestatedate", "startDate"],
                    ["eesdatemod", "dateModifier"],
                    ["eestart", "startDateISOString"],
                    ["eeenddate", "endDate"],
                    ["eeedatemod", "endDateModifier"],
                    ["eeend", "endDateISOString"],
                    ["eedatequal", "dateQualifier"],
                    ["eenote", "processingNotes"],
                    ["eenote", "processingNotes"],
                    "eerating",
                    ["eeappenddate", "recordAppendDate"],
                    ["eelastmodd", "recordLastModified"],
                    "otdid",
                ];
                let event = {
                    "@id": `#${encodeURIComponent(row.eid)}_event`,
                    "@type": [type, row.eetype],
                    description: row.eedescription,
                    entity: { "@id": `#${encodeURIComponent(row.eid)}` },
                };
                mapEntityProperties(row, event, properties);

                extractEntity({
                    rows,
                    entity: event,
                    type: "Location",
                    value: row.eelocation,
                    property: "location",
                });
                extractEntity({
                    rows,
                    entity: event,
                    type: "Person",
                    value: row.eeprepared,
                    property: "preparedBy",
                });

                // push the entity definition into the graph
                rows.push(entity);
            }
            offset += pageSize;
        }
        return rows;
    }
}
