import { pageSize, mapEntityProperties } from "./config.js";
import { extractEntity } from "./common.js";

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
                    ["dovformat", "format"],
                    ["dovdefault", "primaryVersion"],
                    "dovattributes",
                    ["dovstartdate", "startDate"],
                    ["dovsdatemod", "startDateModifier"],
                    ["dovstart", "startDateISOString"],
                    ["dovenddate", "endDate"],
                    ["dovedatemod", "endDateModifier"],
                    ["dovend", "endDateISOString"],
                    ["dovphysdesc", "physicalDescription"],
                    ["dovcreator", "resourceCreator"],
                    ["dovcontrol", "controlCode"],
                    ["dovreference", "note"],
                    ["dovnotes", "processingNotes"],
                    ["dovstatus", "outputStatus"],
                    ["dovappendate", "recordAppendDate"],
                    ["dovlastmodd", "recordLastModified"],
                    "dovimagedisplay",
                    "dovorder",
                    ["dovportrait", "imageOrientation"],
                ];

                // If it's a multipage image, then you just want to point to the directory with the images
                // The raw string from the OHRM points to a defunct 'multi_page_viewer' url, e.g.
                // objects/images/image_viewer_paged.htm?BLI2,3,1,S => objects/images/BLI
                let dov_id = row.dov;
                let parent_type = "File";
                const viewer_path_re = /image_viewer_paged\.htm\?/
                if (row.dovtype == "multipage image") {
                    if (viewer_path_re.test(dov_id)) {
                        let stub, codes, subdir, rest;
                        [stub, codes] = dov_id.split(viewer_path_re);
                        [subdir, ...rest] = codes.split(",");
                        dov_id = stub + subdir;
                        parent_type = "Dataset";
                    } else {
                        break
                    }
                }

                const dobject = {
                    "@id": encodeURI(dov_id),
                    "@type": [parent_type, "DigitalObjectVersion", row.dovtype],
                    dobjectIdentifier: row.doid,
                    name: row.dovtitle ?? dov_id,
                    description: row.dovdescription,
                    dobject: { "@id": `#${encodeURIComponent(row.doid)}` },
                };
                if (row.arcid) dobject.linkedArchivalResource = { "@id": row.arcid };
                if (row.pubid) dobject.linkedPublishedResource = { "@id": row.pubid };
                mapEntityProperties(row, dobject, properties);

                let extractEntities = [{ type: "Place", value: row.doplace, property: "place" }];
                for (let e of extractEntities) {
                    if (e.value) {
                        let d = extractEntity({
                            type: e.type,
                            value: e.value,
                        });
                        rows.push(d);
                        dobject[e.property] = { "@id": d["@id"] };
                    }
                }
                rows.push(dobject);
            }
            offset += pageSize;
        }
        return rows;
    }
}
