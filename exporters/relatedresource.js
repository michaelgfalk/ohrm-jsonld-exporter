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
                    ["rrstartdate", "startDate"],
                    ["rrsdatemod", "startDateModifier"],
                    ["rrstart", "startDateISOString"],
                    ["rrenddate", "endDate"],
                    ["rrdatemod", "endDateModifier"],
                    ["rrend", "endDateISOString"],
                    ["rrdatequal", "dateQualifier"],
                    ["rrnote", "processingNotes"],
                    ["rrrating", "relationshipStrength"],
                    ["rrappenddate", "recordAppendDate"],
                    ["rrlastmodd", "recordLastModified"],
                ];
                const relatedResource = {
                    "@id": `#${encodeURIComponent(row.rid)}-${encodeURIComponent(row.rrid)}`,
                    "@type": ["Relationship", row.rtype.replace(/\s/g, "")],
                    identifier: `${row.eid}-${row.reid}`,
                    name: `#${encodeURIComponent(row.rid)}-${encodeURIComponent(row.rrid)}`,
                    description: row.rrdescription,
                    source: { "@id": `#${encodeURIComponent(row.rid)}` },
                    target: { "@id": `#${encodeURIComponent(row.rrid)}` },
                };
                mapEntityProperties(row, relatedResource, properties);
            }
            offset += pageSize;
        }
        return rows;
    }
}
