// the database connection information
export const databaseConfig = {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
};

// the domain prefix to use
export const domainPrefix = "https://ctac.esrc.unimelb.edu.au";

// default RO Crate context and root descriptor
export const defaultContext = "https://w3id.org/ro/crate/1.1/context";
export const rootDescriptor = {
    "@type": "CreativeWork",
    "@id": "ro-crate-metadata.json",
    conformsTo: { "@id": "https://w3id.org/ro/crate/1.1" },
    about: { "@id": "./" },
};
