import { pageSize } from "./config.js";

export class TypeOf {
    constructor() {}

    async export({ models }) {
        // let rows = await this.exportArFormats({ model: models.typeofarformats });
        // rows = [...rows, ...(await this.exportContent({ model: models.typeofcontent }))];
        // rows = [...rows, ...(await this.exportEntities({ model: models.typeofentity }))];
        // rows = [...rows, ...(await this.exportFormats({ model: models.typeofformat }))];
        // rows = [...rows, ...(await this.exportResources({ model: models.typeofresource }))];
        // rows = [...rows, ...(await this.exportWorks({ model: models.typeofwork }))];
        return rows;
    }
    async exportArFormats({ model }) {
        console.log("HERE AT exportArFormats");
        doesnotrun;
        let offset = 0;
        let rows = [];
        let total = await model.count();
        while (offset <= total) {
            for (let row of await model.findAll({ limit: pageSize, offset })) {
                const entity = {
                    "@id": `#${encodeURIComponent(row.typeofarformats)}`,
                    "@type": ["EntityType", "ArchiveFormat"],
                    name: row.typeofarformats,
                };
                // console.log(JSON.stringify(entity, null, 2));
                rows.push(entity);
            }
            offset += pageSize;
        }
        return rows;
    }
    async exportContent({ model }) {
        let offset = 0;
        let rows = [];
        let total = await model.count();
        while (offset <= total) {
            for (let row of await model.findAll({ limit: pageSize, offset })) {
                const entity = {
                    "@id": `#${encodeURIComponent(row.typeofcontent)}`,
                    "@type": ["EntityType", "ContentType"],
                    name: row.typeofcontent,
                };
                // console.log(JSON.stringify(entity, null, 2));
                rows.push(entity);
            }
            offset += pageSize;
        }
        return rows;
    }
    async exportEntities({ model }) {
        let offset = 0;
        let rows = [];
        let total = await model.count();
        while (offset <= total) {
            for (let row of await model.findAll({ limit: pageSize, offset })) {
                const entity = {
                    "@id": `#${encodeURIComponent(row.types)}`,
                    "@type": "EntityType",
                    name: row.types,
                    elabel: row.elabel,
                    entrylabel: row.entrylabel,
                    detaillabel: row.detaillabel,
                    gentype: row.gentype,
                    description: row.description,
                    eventlabel: row.eventlabel,
                };
                // console.log(JSON.stringify(entity, null, 2));
                rows.push(entity);
            }
            offset += pageSize;
        }
        return rows;
    }
    async exportFormats({ model }) {
        let offset = 0;
        let rows = [];
        let total = await model.count();
        while (offset <= total) {
            for (let row of await model.findAll({ limit: pageSize, offset })) {
                const entity = {
                    "@id": `#${encodeURIComponent(row.typeofformat)}`,
                    "@type": ["EntityType", "Format"],
                    name: row.typeofformat,
                };
                // console.log(JSON.stringify(entity, null, 2));
                rows.push(entity);
            }
            offset += pageSize;
        }
        return rows;
    }
    async exportResources({ model }) {
        let offset = 0;
        let rows = [];
        let total = await model.count();
        while (offset <= total) {
            for (let row of await model.findAll({ limit: pageSize, offset })) {
                const entity = {
                    "@id": `#${encodeURIComponent(row.typeofresource)}`,
                    "@type": ["EntityType", "Resource"],
                    name: row.typeofresource,
                    online: row.online,
                    htmlfile: row.htmfile,
                    citationtype: row.citationtype,
                    endnotereferencetype: row.endnotereferencetype,
                };
                // console.log(JSON.stringify(entity, null, 2));
                rows.push(entity);
            }
            offset += pageSize;
        }
        return rows;
    }
    async exportWorks({ model }) {
        let offset = 0;
        let rows = [];
        let total = await model.count();
        while (offset <= total) {
            for (let row of await model.findAll({ limit: pageSize, offset })) {
                const entity = {
                    "@id": `#${encodeURIComponent(row.typeofwork)}`,
                    "@type": ["EntityType", "Work"],
                    name: row.typeofwork,
                };
                // console.log(JSON.stringify(entity, null, 2));
                rows.push(entity);
            }
            offset += pageSize;
        }
        return rows;
    }
}
