import { pageSize, mapEntityProperties } from "./config.js";

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
                    "x_year",
                    "secondaryauthor",
                    "secondarytitle",
                    "placepublished",
                    "publisher",
                    "volume",
                    "numberofvolumes",
                    "number",
                    "pagenos",
                    "edition",
                    "x_date",
                    "isbn_issn",
                    "source",
                    "abstract",
                    "notes",
                    "classification",
                    "url",
                    "urltype",
                    "urldate",
                    "format",
                    "x_language",
                    "contains",
                    "pubappenddate",
                    "publastmodd",
                    "descriptionofwork",
                    "prepared",
                    "catid",
                    "processing",
                    "status",
                ];

                const pubresource = {
                    "@id": `#${encodeURIComponent(row.pubid)}`,
                    "@type": ["PublishedResource", row.type],
                    identifier: row.pubid,
                    name: row.title,
                };
                if (row.typeofwork) {
                    pubresource.typeofwork = { "@id": `#${encodeURIComponent(row.typeofwork)}` };
                }
                mapEntityProperties(row, pubresource, properties);
                rows.push(pubresource);
            }
            offset += pageSize;
        }
        return rows;
    }
}
