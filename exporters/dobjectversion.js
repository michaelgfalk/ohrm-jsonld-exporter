import { pageSize } from "./config.js";

export class DObjectVersion {
    constructor() {}

    async export({ models }) {
        let offset = 0;
        let rows = [];
        let total = await models.dobjectversion.count();
        while (offset <= total) {
            for (let row of await models.dobjectversion.findAll({ limit: pageSize, offset })) {
                // console.log(row.get());
                const properties = [
                    "dovdefault",
                    "dov",
                    "dovattributes",
                    "dovstartdate",
                    "dovsdatemod",
                    "dovstart",
                    "dovenddate",
                    "dovedatemod",

                    "dovend",
                    "dovplace",
                    "dovphysdesc",
                    "dovcreator",
                    "dovcontrol",
                    "arcid",
                    "pubid",
                    "dovreference",
                    "dovnotes",
                    "dovstatus",
                    "dovappendate",
                    "dovlastmodd",
                    "dovimagedisplay",
                    "dovorder",
                    "dovportrait",
                ];

                const dobject = {
                    "@id": encodeURI(row.dov),
                    "@type": "File",
                    entityType: [
                        { "@id": "#DigitalObject" },
                        { "@id": `#${encodeURIComponent(row.dovtype)}` },
                    ],
                    dobjectIdentifier: row.doid,
                    name: row.dovtitle,
                    description: row.dovdescription,
                };
                properties.forEach((property) => {
                    if (row[property]) dobject[property] = row[property];
                });
                rows.push(dobject);
                rows.push({
                    "@id": "#DigitalObject",
                    "@type": "EntityType",
                    name: "Digital Object",
                });
                rows.push({
                    "@id": `#${encodeURIComponent(row.dovtype)}`,
                    "@type": "EntityType",
                    name: row.dovtype,
                });
            }
            offset += pageSize;
        }
        return rows;
    }
}
