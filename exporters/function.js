import { pageSize, mapEntityProperties } from "./config.js";
import { extractEntity } from "./common.js";

export class Function {
    constructor() {}

    async export({ models }) {
        let offset = 0;
        let rows = [];
        let total = await models.function_.count();
        while (offset <= total) {
            for (let row of await models.function_.findAll({ limit: pageSize, offset })) {
                // console.log(row.get());
                const properties = [
                    ["fstartdate", "startDate"],
                    ["fsdatemod", "dateModifier"],
                    ["fstart", "startDateISOString"],
                    ["fenddate", "endDate"],
                    ["fedatemod", "dateModifier"],
                    ["fend", "endDateISOString"],
                    ["fdatequal", "dateQualifier"],
                    "fapplies",
                    ["fappenddate", "recordAppendDate"],
                    ["flastmod", "recordLastModified"],
                    ["fnote", "processingNotes"],
                    "fparent",
                ];

                const entityFunction = {
                    "@id": `#${encodeURIComponent(row.fid)}`,
                    "@type": ["Function"],
                    identifier: row.fid,
                    name: row.fname,
                    description: row.fdescription,
                };
                mapEntityProperties(row, entityFunction, properties);
                rows.push(entityFunction);
            }
            offset += pageSize;
        }
        return rows;
    }
}
