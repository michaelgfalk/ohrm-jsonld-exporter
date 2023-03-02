import { pageSize, mapEntityProperties } from "./config.js";

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
                    "dostartdate",
                    "dodatemod",
                    "dostart",
                    "doenddate",
                    "doend",
                    "doplace",
                    "dophysdesc",
                    "docreator",
                    "docontrol",
                    "arcid",
                    "pubid",
                    "doreference",
                    "dorights",
                    "donotes",
                    "dostatus",
                    ["doappenddate", "dateModified"],
                    "dolastmod",
                    "dointerpretation",
                ];

                const dobject = {
                    "@id": `#${encodeURIComponent(row.doid)}`,
                    "@type": ["DigitalObject", row.dotype],
                    identifier: row.doid,
                    name: row.dotitle,
                    description: row.dodescription,
                };
                mapEntityProperties(row, dobject, properties);
                if (row.doprepared) {
                    rows.push({
                        "@id": `#${encodeURIComponent(row.doprepared)}`,
                        "@type": "Person",
                        name: row.doprepared,
                    });
                    dobject.doprepared = { "@id": `#${encodeURIComponent(row.doprepared)}` };
                }
                rows.push(dobject);
            }
            offset += pageSize;
        }
        return rows;
    }
}
