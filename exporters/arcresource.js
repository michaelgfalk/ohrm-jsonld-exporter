import { pageSize, mapEntityProperties } from "./config.js";

export class ArcResource {
    constructor() {}

    async export({ models }) {
        let offset = 0;
        let rows = [];
        let total = await models.arcresource.count();
        while (offset <= total) {
            for (let row of await models.arcresource.findAll({ limit: pageSize, offset })) {
                console.log(row.get());
                const properties = [
                    ["repid", "repositoryId"],
                    ["arrepref", "archiveIdentifier"],
                    ["arrepreflink", "archiveLink"],
                    ["arlanguage", "resourceLanguage"],
                    ["arstatedate", "startDate"],
                    ["arsdatemod", "dateModifier"],
                    ["arstart", "startDateISOString"],
                    ["arenddate", "endDate"],
                    ["aredatemod", "endDateModifier"],
                    ["arend", "endDateISOString"],
                    ["arquantityl", "linearMetres"],
                    ["arquantityn", "numberOfItems"],
                    ["arquantityt", "typeOfItems"],
                    ["arformats", "formatOfItems"],
                    ["araccess", "accessConditions"],
                    "arotherfa",
                    ["arref", "organisationalIdentifier"],
                    ["arappendate", "recordCreationDate"],
                    ["arlastmodd", "recordLastModifiedDate"],
                    ["arcreator", "resourceCreator"],
                    ["arlevel", "levelOfCollection"],
                    ["arprocessing", "processingNote"],
                    ["arstatus", "outputStatus"],
                ];



                const arcresource = {
                    "@id": `#${encodeURIComponent(row.arcid)}`,
                    "@type": "ArchivalResource", //["ArchiveResource", "HeritageResource"], 
                    //Not sure that that two types are needed and ArchiveResource looks like a typo
                    identifier: row.arcid,
                    name: row.artitle,
                    subTitle: row.arsubtitle,
                    description: row.ardescription,
                };
                console.log(arcresource)
                doesnotrun;
                mapEntityProperties(row, arcresource, properties);
                // This was being pushed multiple times
                // better to just have a type ArchivalResource?
                /*
                rows.push({
                    "@id": "#ArchivalResource",
                    "@type": "EntityType",
                    name: "Archival Resource",
                });
                */
                if (row.arprepared) {
                    rows.push({
                        "@id": `#${encodeURIComponent(row.arprepared)}`,
                        "@type": "Person",
                        name: row.arprepared,
                    });
                    arcresource.preparedBy = { "@id": `#${encodeURIComponent(row.arprepared)}` };
                }
                rows.push(arcresource);
            }
            offset += pageSize;
        }
        return rows;
    }
}
