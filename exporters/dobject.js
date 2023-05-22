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
                // Changed this so that this is a container for the files not a File, following the PCDM model
                const dobject = {
                    "@id": `#${encodeURIComponent(row.doid)}`,
                    "@type": ["RepositoryObject", "DigitalObject", row.dotype],
                    identifier: row.doid,
                    name: row.dotitle,
                    description: row.dodescription,
                    hasFile: versions,
                };
                if (row.arcid) {
                    dobject.linkedArchivalResource = { "@id": `#${encodeURIComponent(row.arcid)}` };
                }

                if (row.pubid) {
                    dobject.linkedPublishedResource = {
                        "@id": `#${encodeURIComponent(row.pubid)}`,
                    };
                }
                mapEntityProperties(row, dobject, properties);

                let extractEntities = [
                    { type: "Person", value: row.doprepared, property: "preparedBy" },
                    { type: "Place", value: row.doplace, property: "place" },
                ];
                for (let e of extractEntities) {
                    if (e.value) {
                        let d = extractEntity({
                            type: e.type,
                            value: e.value,
                        });
                        rows.push(d);
                        dobject[e.property] = { "@id": d["@id"] };
                    }
                }
                rows.push(dobject);
            }
            offset += pageSize;
        }
        return rows;
    }
}
