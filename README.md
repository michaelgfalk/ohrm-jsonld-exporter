# OHRM -> JSON-LD export tool

- [OHRM -\> JSON-LD export tool](#ohrm---json-ld-export-tool)
- [Developing the code](#developing-the-code)
  - [Get the data](#get-the-data)
  - [Start the postgres container and load an OHRM DB dump](#start-the-postgres-container-and-load-an-ohrm-db-dump)
  - [Working with an OHRM dataset](#working-with-an-ohrm-dataset)

# Developing the code

## Get the data

Before you get started you will need the data from someone who has it. That is, you will need to get
hold of the Postgres db dump of an OHRM or OHRMS. Unpack those files in the folder `./data` which is
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

The OHRM data is now loaded into the database. As the container is backed by a persistent volume in
docker you will not need to do these steps again the next time you start the DB unless you remove
that volume. Repeat these steps to load more OHRM datasets into this database instance.

## Working with an OHRM dataset

-   Let's say you want to work with the DHRA OHRM:

-   define which database you want to work with by setting an environment variables:
    `export DB_DATABASE='dhra'`
-   start the database server if required: `docker compose up -d`
-   in one terminal connect to the DB container and then the database:
    -   `docker exec -t ohrm-jsonld-exporter-db-1 /bin/bash`
    -   `psql dhra`
-   in another terminal exec into the linux container that has been started:
    -   `docker exec -it ohrm-jsonld-exporter-exporter-1 /bin/bash`
    -   install dependencies: `npm install`
    -   export the ohrm data to the data folder: `node . -o ./data/dhra-jsonld`
