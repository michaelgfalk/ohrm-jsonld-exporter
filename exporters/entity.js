import { pageSize, mapEntityProperties } from "./config.js";
import { extractEntity } from "./common.js";

export class Entity {
    constructor() {}

    async export({ models }) {
        let offset = 0;
        let rows = [];
        let total = await models.entity.count();
        while (offset <= total) {
            for (let row of await models.entity.findAll({ limit: pageSize, offset })) {
                const properties = [
                    ["ecountrycode", "countryCode"],
                    ["eorgcode", "organisationCode"],
                    ["esubname", "subName"],
                    ["elegalno", "legalNumber"],
                    ["estartdate", "startDate"],
                    ["esdatemod", "startDateModifier"],
                    ["estart", "startDateISOString"],
                    ["eenddate", "endDate"],
                    ["eedatemod", "endDateModifier"],
                    ["eend", "endDateISOString"],
                    ["edatequal", "dateQualifier"],
                    ["elegalstatus", "legalStatus"],
                    ["efunction", "function"],
                    ["esumnote", "summaryNote"],
                    ["efullnote", "fullNote"],
                    ["egender", "gender"],
                    ["ereference", "reference"],
                    ["enote", "processingNotes"],
                    ["eappenddate", "recordAppendDate"],
                    ["elastmod", "recordLastModified"],
                    ["elogo", "logo"],
                    ["eurl", "url"],
                    ["earchives", "archives"],
                    "epub",
                    ["eonline", "online"],
                    ["egallery", "gallery"],
                    ["eowner", "owner"],
                    ["erating", "rating"],
                    ["estatus", "status"],
                    "x_efunction",
                ];

                let type = row.etype.split("-").map((v) => v.trim());

                let entityAlsoKnownAs = await models.entityname.findAll({
                    where: { eid: row.eid },
                });
                entityAlsoKnownAs.map((entity) => {
                    extractEntity({
                        rows,
                        entity,
                        type: "Place",
                        value: entity.enplace,
                        property: "place",
                    });

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

                    let alsoKnownAs = {
                        "@id": `#${encodeURIComponent(entity.eid)}_alsoKnownAs`,
                        "@type": [type, entity.enalternatetype],
                        name: entity.enalternate,
                        alsoKnownAs: { "@id": `#${encodeURIComponent(row.eid)}` },
                    };
                    mapEntityProperties(entity, alsoKnownAs, properties);
                    rows.push(alsoKnownAs);
                    return entity;
                });
                let entityEvent = await models.entityevent.findAll({ where: { eid: row.eid } });
                entityEvent.map((entity) => {
                    extractEntity({
                        rows,
                        entity,
                        type: "Location",
                        value: entity.eelocation,
                        property: "location",
                    });
                    extractEntity({
                        rows,
                        entity,
                        type: "Person",
                        value: row.eeprepared,
                        property: "preparedBy",
                    });
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
                    let entityEvent = {
                        "@id": `#${encodeURIComponent(entity.eid)}_event`,
                        "@type": [type, entity.eetype],
                        description: entity.eedescription,
                    };
                    mapEntityProperties(entity, entityEvent, properties);
                    rows.push(entityEvent);
                    return entityEvent;
                });

                const entity = {
                    "@id": `#${encodeURIComponent(row.eid)}`,
                    "@type": type,
                    identifier: row.eid,
                    name: row.ename,
                    alsoKnownAs: entityAlsoKnownAs.map((e) => ({ "@id": e["@id"] })),
                    relatedEvents: entityEvent.map((e) => ({ "@id": e["@id"] })),
                };
                mapEntityProperties(row, entity, properties);

                extractEntity({
                    rows,
                    entity,
                    type: "Person",
                    value: row.eprepared,
                    property: "preparedBy",
                });
                extractEntity({
                    rows,
                    entity,
                    type: "Place",
                    value: row.ebthplace,
                    property: "birthPlace",
                });
                extractEntity({
                    rows,
                    entity,
                    type: "State",
                    value: row.ebthstate,
                    property: "birthState",
                });
                extractEntity({
                    rows,
                    entity,
                    type: "Country",
                    value: row.ebthcountry,
                    property: "birthCountry",
                });
                extractEntity({
                    rows,
                    entity,
                    type: "Place",
                    value: row.edthplace,
                    property: "deathPlace",
                });
                extractEntity({
                    rows,
                    entity,
                    type: "State",
                    value: row.edthstate,
                    property: "deathState",
                });
                extractEntity({
                    rows,
                    entity,
                    type: "Country",
                    value: row.edthcountry,
                    property: "deathCountry",
                });
                extractEntity({
                    rows,
                    entity,
                    type: "Nationality",
                    value: row.enationality,
                    property: "nationality",
                });

                // push the entity definition into the graph
                rows.push(entity);
            }
            offset += pageSize;
        }
        return rows;
    }
}
