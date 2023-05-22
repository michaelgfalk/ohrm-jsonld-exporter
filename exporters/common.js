export function extractEntity({ type, value }) {
    let relatedEntity = {
        "@id": `#${encodeURIComponent(value)}`,
        "@type": type,
        name: value,
    };
    return relatedEntity;
}
