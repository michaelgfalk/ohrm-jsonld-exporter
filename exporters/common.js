export function extractEntity({ rows, entity, type, value, property }) {
    if (!value) return;
    let relatedEntity = {
        "@id": `#${encodeURIComponent(value)}`,
        "@type": type,
        name: value,
    };
    rows.push(relatedEntity);
    entity[property] = { "@id": `#${encodeURIComponent(value)}` };
}
