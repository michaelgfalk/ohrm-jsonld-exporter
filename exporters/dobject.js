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
                    "@type": ["RepositoryObject"],
                    identifier: row.doid,
                    name: row.dotitle,
                    description: row.dodescription,
                    hasFile: versions,
                };
                if (row.arcid) {
                    dobject.archivalResource = { "@id": `#${encodeURIComponent(row.arcid)}`};
                }  


                // row.arcid seems to be always missing -- trying a hac
                // Remove linked from prop name as it is redundant
                if (row.pubid) {
                    dobject.publishedResource = { "@id": `#${encodeURIComponent(row.pubid)}`};
                    //console.log("Found pubid", dobject)

                } else {
                    // HACK this works some of the time on DHRA -- TODO -- fix
                    dobject.publishedResource = { "@id": dobject["@id"].replace(/D0/,"PR")};

                }
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
