import { pageSize, mapEntityProperties } from "./config.js";
import { extractEntity } from "./common.js";

export class EntityEvent {
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

                let entityDefinition = await models.entity.findOne({ where: { eid: row.eid } });
                let type = entityDefinition?.etype
                    .split("-")
                    .map((v) => v.trim().replace(" ", "_"));
                // console.log(row.eid, entityDefinition.etype);
                type = type ?? [];

                let event = {
                    "@id": `#${encodeURIComponent(row.eid)}_event`,
                    "@type": [...type, row.eetype],
                    description: row.eedescription,
                    entity: { "@id": `#${encodeURIComponent(row.eid)}` },
                };
                mapEntityProperties(row, event, properties);

                let extractEntities = [
                    { type: "Place", value: row.eelocation, property: "location" },
                    { type: "Person", value: row.eeprepared, property: "preparedBy" },
                ];
                for (let e of extractEntities) {
                    if (e.value) {
                        let d = extractEntity({
                            type: e.type,
                            value: e.value,
                        });
                        rows.push(d);
                        event[e.property] = { "@id": d["@id"] };
                    }
                }

                // push the entity definition into the graph
                rows.push(event);
            }
            offset += pageSize;
        }
        return rows;
    }
}
