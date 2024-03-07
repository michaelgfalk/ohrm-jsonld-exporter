# Look into directory of OHRMs; convert all to RO-Crate; push to figshare
import argparse
from collections import namedtuple
import os
from typing import TypeAlias

import docker as docker

container: TypeAlias = docker.models.containers.Container
client: TypeAlias = docker.DockerClient

ohrm = namedtuple("ohrm_dir", ["name", "path"])

parser = argparse.ArgumentParser(
    prog="OHRMUploader",
    description="Look into directory of OHRMS; convert to RO-Crate; push to figshare"
)
parser.add_argument("-d", "--ohrm-directory", help="The directory containing the OHRM dumps (or use OHRM_DIRECTORY env variable)", default=os.environ.get("OHRM_DIRECTORY"))
parser.add_argument("-a", "--figshare-api", help="figshare API endpoint (or use FIGSHARE_API env variable)", default=os.environ.get("FIGSHARE_API"))
parser.add_argument("-t", "--figshare-token", help="API token for figshare (or use FIGSHARE_TOKEN env variable)", default=os.environ.get("FIGSHARE_TOKEN"))
parser.add_argument("--db-host", help="host for local PostGres database (defaults to environment variable)", default=os.environ.get("DB_HOST"))
parser.add_argument("--db-port", help="port for local PostGres database (defaults to environment variable)", default=os.environ.get("DB_PORT"))
parser.add_argument("--db-password", help="password for local postgres, defults to env DB_PASSWORD", default=os.environ.get("DB_PASSWORD"))
parser.add_argument("--db-user", help="user for database, defaulst to DB_USER env variabl", default=os.environ.get("DB_USER"))


args = parser.parse_args()

# for arg in args.__dict__:
#     if args.__dict__[arg] is None:
#         exit(parser.print_usage())

DB_CONTAINER = "ohrm-jsonld-exporter-db-1"
NODE_CONTAINER = "ohrm-jsonld-exporter-exporter-1"
OHRM_LINKNAME = "ohrm-data"
UPLOAD_DIR = "upload"
DOCKER_HOMEDIR = os.path.join("/", "srv", "exporter")

def main() -> int:
    run()
    return 1

def run() -> int:
    """Main entry point for script"""
    client, db_container, node_container = _connect_to_docker()
    ohrm_dir = _link_ohrm_dir(args.ohrm_directory, OHRM_LINKNAME)
    ohrms = _list_ohrms(ohrm_dir)
    print(ohrms)
    _unlink_ohrm_dir(ohrm_dir)
    return 1

def _connect_to_docker() -> tuple[client, container, container]:
    """Return container objects for the two docker containers in the app"""
    client = docker.from_env()
    containers = client.containers
    return client, containers.get(DB_CONTAINER), containers.get(NODE_CONTAINER)

# FIND AND LINK THE OHRMS

def _link_ohrm_dir(directory: str = args.ohrm_directory, name: str = OHRM_LINKNAME) -> str:
    """Link volume of OHRMS to working directory"""
    os.symlink(directory, name)
    return name

def _unlink_ohrm_dir(name) -> int:
    os.unlink(name)
    return 1

def _list_ohrms(directory) -> list[ohrm]:
    """List all the OHRMS in the source directory"""
    with os.scandir(directory) as ohrm_directory:
        ohrms = [ohrm(name=entry.name, path=entry.path)
                 for entry in ohrm_directory
                 if entry.is_dir and not
                    entry.name.startswith(".") and not
                    entry.name.startswith("$") and not
                    entry.name.endswith(".zip")]
    return ohrms

# BUILD AND DROP PSQL DATABASE FOR IMPORT

def _create_database(ohrm: ohrm, db_container: container) -> int:
    """Create empty database for OHRM in the db container"""
    db_container.exec_run(f"psql postgres -c 'create database {ohrm.name};'")
    return 1

def _initialise_database(ohrm: ohrm, db_container: container) -> int:
    """Run init script to build postgres database for ohrm"""
    sql_dir = os.path.join(DOCKER_HOMEDIR, ohrm.path, "web", "sql")
    db_container.exec_run(f"cd {sql_dir}")
    db_container.exec_run(f"psql {ohrm.name} < initialise{ohrm.name}.sql")
    db_container.exec_run(f"cd {DOCKER_HOMEDIR}")
    return 1

def _drop_database(name: str, db_container: container) -> int:
    db_container.exec_run(f"psql postgres -c 'drop database {name};'")
    return 1

# RUN NODE EXPORTER APP


# UPLOAD TO FIGSHARE



if __name__ == "__main__":
    main()
