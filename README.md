# OHRM -> JSON-LD export tool

- [OHRM -\> JSON-LD export tool](#ohrm---json-ld-export-tool)
- [Developing the code](#developing-the-code)
  - [Get the data](#get-the-data)
  - [Start the postgres container and load an OHRM DB dump](#start-the-postgres-container-and-load-an-ohrm-db-dump)
  - [Working with an OHRM dataset](#working-with-an-ohrm-dataset)
  - [Repository Layout / Code overview](#repository-layout--code-overview)

# Developing the code

## Get the data

Before you get started you will need the data from someone who has it. That is, you will need to get
hold of the Postgres db dump of an OHRM or OHRMs. Unpack those files in the folder `./data` which is
mounted into the container `/srv/data`.

## Start the postgres container and load an OHRM DB dump

-   Start the database: `docker compose up -d`
-   Exec into the postgress container: `docker exec -it ohrm-jsonld-exporter-db-1 /bin/bash`
-   Inside the container, connect to the database. `psql postgres`
-   To load an OHRM dump for (for example) the DHRA ohrm; whilst connected to the database server as
    shown above: `create database dhra;`
-   Log out of the db (exit) and then load the data. Let's say you unpacked the DHRA.zip file into
    `./data/DHRA-sql` (this is on your computer; not inside the container). Inside the container do
    the following:
    -   `cd /srv/data/DHRA-sql`
    -   `psql dhra < initialiseDHRA.sql`

The OHRM data is now in the database. As the container is backed by a persistent volume in
docker you will not need to do these steps again the next time you start the DB unless you remove
that volume. Repeat these steps to load more OHRM datasets into this database instance.

## Working with an OHRM dataset

-   To work with the DHRA OHRM:

-   start the database server if required: `docker compose up -d`
-   in one terminal connect to the DB container and then the database:
    -   `docker exec -it ohrm-jsonld-exporter-db-1 /bin/bash`
    -   `psql dhra`
-   in another terminal exec into the linux container that has been started:
    -   `docker exec -it ohrm-jsonld-exporter-exporter-1 /bin/bash`
    -   install dependencies: `npm install`
    -   define which database you want to work with by setting an environment variables:
        `export DB_DATABASE='dhra'`
    -   export the ohrm data to the data folder as one big RO crate file and generate a second crate which describes the Schema for that data as per the Schema.org approach:
        `node . -o ./data/dhra-jsonld -v ./data/dhra-schema`
    -   export the ohrm data and print to STDOUT as one big RO crate file: `node .`

## Repository Layout / Code overview

-   All database tables have been reflected in Sequelize models in the `./models` folder.
-   All exporters - one per table - are found in the `./exporters` folder. The structure of these is
    the same.
    -   All exporters have a single class named as the table with a single method `export` that
        iterates over the rows of the table and writes out a JSON-LD snippet with the data. Those
        snippets are then returned back to the main module to insert into the ro crate.
    -   In the export method of any given exporter you will see an array or properties with odd
        looking names. These correspond directly to the table column names. If you want to output a
        column with a new name then change the entry to an array. e.g

```
for (let row of await models.entity.findAll({ limit: pageSize, offset })) {
    const properties = [
        ...
        "elegalno",
        ["estartdate", 'dateCreated' ],
        "esdatemod",
        ...
```

In this example the data in the `estartdate` column will be written out to a field called
`dateCreated` in the JSON-LD snippet.

-   The exporters are then wired up into the file `./index.js` which first runs all of the exporters
    and then goes through linking the relationship entities to the respective targets.
