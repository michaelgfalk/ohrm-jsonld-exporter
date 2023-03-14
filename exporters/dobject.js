import { pageSize, mapEntityProperties } from "./config.js";
import { extractEntity } from "./common.js";

export class DObject {
    constructor() {}

    async export({ models }) {
        let offset = 0;
        let rows = [];
        let total = await models.dobject.count();
        while (offset <= total) {
            for (let row of await models.dobject.findAll({ limit: pageSize, offset })) {
                // console.log(row.get());
                const properties = [
                    ["dostartdate", "startDate"],
                    ["dodatemod", "startDateModifier"],
                    ["dostart", "startDateISOString"],
                    ["doenddate", "endDate"],
                    ["doedatemod", "endDateModifier"],
                    ["doend", "endDateISOString"],
                    ["dophysdesc", "physicalDescription"],
                    ["docreator", "resourceCreator"],
                    ["docontrol", "controlCode"],
                    ["doreference", "note"],
                    ["dorights", "objectIPRights"],
                    ["donotes", "processingNotes"],
                    ["dostatus", "outputStatus"],
                    ["doappenddate", "recordAppendDate"],
                    ["dolastmod", "recordLastModified"],
                    "dointerpretation",
                ];

                let versions = await models.dobjectversion.findAll({ where: { doid: row.doid } });
                versions = versions.map((entity) => {
                    return { "@id": encodeURI(entity.dov) };
                });

                const dobject = {
                    "@id": `#${encodeURIComponent(row.doid)}`,
                    "@type": ["DigitalObject", row.dotype],
                    identifier: row.doid,
                    name: row.dotitle,
                    description: row.dodescription,
                    versions,
                };
                if (row.arcid) dobject.linkedArchivalResource = { "@id": row.arcid };
                if (row.pubid) dobject.linkedPublishedResource = { "@id": row.pubid };
                mapEntityProperties(row, dobject, properties);
                if (row.doprepared) {
                    rows.push({
                        "@id": `#${encodeURIComponent(row.doprepared)}`,
                        "@type": "Person",
                        name: row.doprepared,
                    });
                    dobject.preparedBy = { "@id": `#${encodeURIComponent(row.doprepared)}` };
                }
                extractEntity({
                    rows,
                    entity: dobject,
                    type: "Place",
                    value: row.doplace,
                    property: "place",
                });
                rows.push(dobject);
            }
            offset += pageSize;
        }
        return rows;
    }
}
