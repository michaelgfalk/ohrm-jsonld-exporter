import { pageSize, mapEntityProperties } from "./config.js";

export class RelatedResource {
    constructor() {}

    async export({ models }) {
        let offset = 0;
        let rows = [];
        let total = await models.relatedresource.count();
        while (offset <= total) {
            for (let row of await models.relatedresource.findAll({ limit: pageSize, offset })) {
                // console.log(row.get());
                const properties = [
                    "rrno",
                    "rrstartdate",
                    "rrsdatemod",
                    "rrstart",
                    "rrenddate",
                    "rrdatemod",
                    "rrend",
                    "rrdatequal",
                    "rrnote",
                    "rrrating",
                    "rrappenddate",
                    "rrlastmodd",
                ];
                const relatedResource = {
                    "@id": `#${encodeURIComponent(row.rid)}-${encodeURIComponent(row.rrid)}`,
                    "@type": ["Relationship", row.rtype],
                    identifier: `${row.eid}-${row.reid}`,
                    name: `#${encodeURIComponent(row.rid)}-${encodeURIComponent(row.rrid)}`,
                    description: row.rrdescription,
                };
                mapEntityProperties(row, relatedResource, properties);
            }
            offset += pageSize;
        }
        return rows;
    }
}
