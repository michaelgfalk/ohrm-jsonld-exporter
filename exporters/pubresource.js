import { pageSize, mapEntityProperties } from "./config.js";
import { extractEntity } from "./common.js";

export class PubResource {
    constructor() {}

    async export({ models }) {
        let offset = 0;
        let rows = [];
        let total = await models.pubresource.count();
        while (offset <= total) {
            for (let row of await models.pubresource.findAll({ limit: pageSize, offset })) {
                // console.log(row.get());
                const properties = [
                    "online",
                    "author",
                    ["x_year", "publicationYear"],
                    ["secondaryauthor", "secondaryAuthor"],
                    ["secondarytitle", "secondaryTitle"],
                    "publisher",
                    "volume",
                    ["numberofvolumes", "numberOfVolumes"],
                    "number",
                    ["pagenos", "numberOfPages"],
                    "edition",
                    ["x_date", "publicationDate"],
                    "isbn_issn",
                    ["source", "referenceSource"],
                    "abstract",
                    "notes",
                    "classification",
                    "url",
                    ["urltype", "urlType"],
                    ["urldate", "dateAccessed"],
                    "format",
                    ["x_language", "contentLanguage"],
                    "contains",
                    ["pubappenddate", "recordAppendDate"],
                    ["publastmodd", "recordLastModified"],
                    ["descriptionofwork", "descriptionOfWork"],
                    ["catid", "catalogueId"],
                    ["processing", "processingNotes"],
                    ["status", "outputStatus"],
                ];
                const workType = row.typeofwork || "";

                const pubresource = {
                    "@id": `#${encodeURIComponent(row.pubid)}`,
                    "@type": ["PublishedResource", row.type.replace(/\s/g, "")],
                    identifier: row.pubid,
                    name: row.title,
                };
                if (workType) {
                    pubresource["@type"].push(workType.replace(/\s/, ""))
                }
                // if (row.typeofwork) {
                //     pubresource.typeofwork = { "@id": `#${encodeURIComponent(row.typeofwork)}` };
                // }
                if (row.prepared) {
                    rows.push({
                        "@id": `#${encodeURIComponent(row.prepared)}`,
                        "@type": "Person",
                        name: row.prepared,
                    });
                    pubresource.preparedBy = { "@id": `#${encodeURIComponent(row.prepared)}` };
                }
                mapEntityProperties(row, pubresource, properties);
                extractEntity({
                    rows,
                    entity: pubresource,
                    type: "Place",
                    value: row.placepublished,
                    property: "place",
                });
                rows.push(pubresource);
            }
            offset += pageSize;
        }
        return rows;
    }
}
