import { pageSize, mapEntityProperties } from "./config.js";

export class Contact {
    constructor() {}

    async export({ models }) {
        let offset = 0;
        let rows = [];
        let total = await models.contact.count();
        while (offset <= total) {
            for (let row of await models.contact.findAll({ limit: pageSize, offset })) {
                // console.log(row.get());
                const properties = [
                    "familyname",
                    "givenname",
                    "organisation",
                    "x_position",
                    "address",
                    "mailingaddress",
                    "phone",
                    "mobile",
                    "fax",
                    "email",
                    "notes",
                    "cappenddate",
                    "clastmodd",
                ];

                const contact = {
                    "@id": `#${encodeURIComponent(row.cid)}`,
                    "@type": ["Contact"],
                    identifier: row.cid,
                    name: row.title,
                };
                mapEntityProperties(row, contact, properties);
                rows.push(contact);
            }
            offset += pageSize;
        }
        return rows;
    }
}
