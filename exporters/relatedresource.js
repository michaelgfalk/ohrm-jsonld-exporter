import { pageSize, mapEntityProperties } from "./config.js";
import { extractEntity } from "./common.js";

export class RelatedResource {
    constructor() {}

    async export({ models }) {
        let offset = 0;
        let rows = [];
        let total = await models.relatedresource.count();
        const proto_rtype = ["Relationship"]
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
                if (!row.rid) continue;
                if (!row.rrid) continue;
                const row_rtype = !row.rtype ? [] : [row.rtype.replace(/\s/g, "")];
                const relatedResource = {
                    "@id": `#${encodeURIComponent(row.rid)}-${encodeURIComponent(row.rrid)}`,
                    "@type": proto_rtype.concat(row_rtype),
                    identifier: `${row.rid}-${row.rrid}`,
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
