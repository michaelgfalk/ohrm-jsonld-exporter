# Look into directory of OHRMs; convert all to RO-Crate; push to figshare
import argparse
import os
import shutil
from typing import TypeAlias

import docker as docker
import yaml
import json
import requests

from figshare import upload_article_to_figshare

container: TypeAlias = docker.models.containers.Container
client: TypeAlias = docker.DockerClient

class OHRM():

    def __init__(self, name: str, path: str):
        self.name = name
        self.path = path
        self.data_path = self._get_data_path()

    def _get_data_path(self) -> str:
        with os.scandir(self.path) as ohrm_directory:
            try:
                (data_path,) = [entry.path
                                for entry in ohrm_directory
                                if entry.is_dir and (entry.name.lower() == "ohrm")]
            except ValueError:
                raise ValueError(f"{ohrm_directory} contains more than one directory")
        return os.path.join(data_path, "")
    
DB_CONTAINER = "ohrm-jsonld-exporter-db-1"
NODE_CONTAINER = "ohrm-jsonld-exporter-exporter-1"
OHRM_LINKNAME = "all-ohrms"
UPLOAD_DIR = os.path.join("upload", "")
DOCKER_HOMEDIR = os.path.join("/", "srv", "exporter", "")
DOCKER_DATADIR = os.path.join("/", "srv", "data", "")
LOCAL_DATADIR = os.path.join("data", "")
PAYLOAD_NAME = "ohrm-data.zip"

with open(".python-config.yml", "rt") as config_file:
    PYTHON_CONFIG = yaml.safe_load(config_file)

parser = argparse.ArgumentParser(
    prog="OHRMUploader",
    description="Look into directory of OHRMS; convert to RO-Crate; push to figshare"
)
parser.add_argument("-d", "--ohrm-directory", help="The directory containing the OHRM dumps (or set ohrm_directory in .python-config.yml)", default=PYTHON_CONFIG["ohrm_directory"])
parser.add_argument("-a", "--figshare-endpoint", help="figshare API endpoint (or set figshare_endpoitn in .python-config.yml)", default=PYTHON_CONFIG["figshare_endpoint"])
parser.add_argument("-t", "--figshare-token", help="API token for figshare (or use FIGSHARE_TOKEN env variable)", default=PYTHON_CONFIG["figshare_token"])

args = parser.parse_args()

def main() -> int:
    run()
    return 1

def run() -> int:
    """Main entry point for script"""
    try:
        client, db_container, node_container = connect_to_docker()
        npm_install(node_container)
        ohrm_dir = link_ohrm_dir(args.ohrm_directory, OHRM_LINKNAME)
        ohrms = list_ohrms(ohrm_dir)
        for ohrm in ohrms:
            export_ohrm(ohrm, db_container, node_container, UPLOAD_DIR)
    finally:
        unlink_ohrm_dir(ohrm_dir)
        client.close()
    return 1

def connect_to_docker() -> tuple[client, container, container]:
    """Return container objects for the two docker containers in the app"""
    client = docker.from_env()
    containers = client.containers
    return client, containers.get(DB_CONTAINER), containers.get(NODE_CONTAINER)

def export_ohrm(ohrm: OHRM, db_container: container, node_container: container, upload_dir: str) -> int:
    """Convert one ohrm to RO-Crate locally"""
    print(f"Exporting {ohrm.name} from {ohrm.path}")
    try:
        initialise_database(ohrm, db_container)
        create_crate_metadata(ohrm, node_container, db_container)
        metadata, payload = assemble_upload(ohrm)
        upload_article_to_figshare(
            metadata=metadata,
            file_path=payload,
            base_url=args.figshare_endpoint,
            token=args.figshare_token
            )
    finally:
        drop_database(ohrm, db_container)
        clean_upload_data(ohrm)
    return 1

# GET OHRM FILES

# There are two key directories in an OHRM:
# - the `sql` directory, containing the metadata
# - the `objects` directory, containing images and so on
# Postgres uses the sql directory to recreate the database
# Node uses the database to produce the ro-crate metadata
# The ro-crate metadata should be packaged with the `objects` folder for upload to Figshare
# We can include all the other folders to, for data preservation purposes

# MOUNT AND UNMOUNT THE VOLUME OF OHRMS

def link_ohrm_dir(directory: str, name: str) -> str:
    """Link volume of OHRMS to working directory"""
    # Sanitise
    directory = os.path.expanduser(directory)
    if not os.path.isdir(directory):
        raise ValueError(f"ohrm_directory '{directory}' does not exist!")
    os.symlink(directory, name)
    return name

def unlink_ohrm_dir(name) -> int:
    os.unlink(name)
    return 1

def list_ohrms(directory) -> list[OHRM]:
    """List all the OHRMS in the source directory"""
    with os.scandir(directory) as ohrm_directory:
        ohrms = [OHRM(name=entry.name, path=entry.path)
                 for entry in ohrm_directory
                 if entry.is_dir and not
                    entry.name.startswith(".") and not
                    entry.name.startswith("$") and not
                    entry.name.endswith(".zip")]
    return ohrms

# BUILD AND DROP PSQL DATABASE FOR IMPORT

def initialise_database(ohrm: OHRM, db_container: container) -> int:
    """Run init script to build postgres database for ohrm"""
    print(f"Initialising psql db for {ohrm.name}")
    sql_path = _get_sql_path(ohrm.data_path)
    sql_init_file = f"initialise{ohrm.name}.sql"
    docker_sql_path = os.path.join(DOCKER_DATADIR, "sql", "")

    _copy_sql_to_data_dir(sql_path)

    db_container.exec_run(f"psql postgres -c 'create database {ohrm.name};'")
    
    init_command = f"psql -d {ohrm.name.lower()} -f {sql_init_file}"
    db_container.exec_run(init_command, workdir=docker_sql_path)

    _rm_sql_copy()
    
    return 1

def drop_database(ohrm: OHRM, db_container: container) -> int:
    print(f"Dropping db for {ohrm.name}")
    db_container.exec_run(f"psql postgres -c 'drop database {ohrm.name};'")
    return 1

def _get_sql_path(data_path: str) -> str:
    return os.path.join(data_path, "web", "sql")

def _copy_sql_to_data_dir(sql_path: str) -> int:
    """Copy directory `sql` into data dir."""
    os.system(f"cp -r {sql_path} {LOCAL_DATADIR}")
    return 1

def _rm_sql_copy() -> int:
    os.system(f"rm -r {os.path.join(LOCAL_DATADIR, "sql")}")

# RUN NODE EXPORTER APP

def npm_install(node_container: container) -> int:
    print("Installing node dependencies.")
    node_container.exec_run("npm install", workdir=DOCKER_HOMEDIR)
    return 1

def set_db_environment_variable(ohrm: OHRM, node_container: container) -> int:
    node_container.exec_run(f"export DB_DATABASE='{ohrm.name}'", workdir=DOCKER_HOMEDIR)
    return 1

def unset_db_environment_variable(node_container: container) -> int:
    node_container.exec_run(f"export DB_DATABASE=''", workdir=DOCKER_HOMEDIR)
    return 1

def create_crate_metadata(ohrm: OHRM, node_container: container, db_container: container) -> int:
    """Create ro-crate-metadata.json and save it in the data dir"""
    crate_dir = os.path.join(".", LOCAL_DATADIR, ohrm.name)
    # Create ro-crate-metadata.json
    node_command = f"node . -o {crate_dir} -d {ohrm.name.lower()}"
    print(f"Running node command: {node_command}")
    node_container.exec_run(node_command, workdir=DOCKER_HOMEDIR)
    # Create ro-crate-preview.html
    node_command = f"npx rochtml {crate_dir}/ro-crate-metadata.json"
    print(f"Running node command: {node_command}")
    node_container.exec_run(node_command, workdir=DOCKER_HOMEDIR)
    return 1

# UPLOAD TO FIGSHARE

def assemble_upload(ohrm: OHRM) -> tuple[dict, str]:
    """Combine the data in the ohrm with the new ro-crate metadata file in LOCAL_DATADIR"""
    crate_dir = os.path.join(LOCAL_DATADIR, ohrm.name)
    upload_dir = os.path.join(UPLOAD_DIR, ohrm.name)
    os.makedirs(upload_dir)
    crate_files = os.path.join(crate_dir, "*")
    # Move RO-crate json into upload dir
    os.system(f"mv {crate_files} {os.path.join(upload_dir, "")}")
    os.system(f"rmdir {crate_dir}")
    # Copy all data files from linked directory into upload dir
    os.system(f"cp -r {ohrm.data_path} {upload_dir}")

    metadata = _get_crate_metadata(upload_dir)
    payload = shutil.make_archive(
        os.path.splitext(PAYLOAD_NAME)[0],
        os.path.splitext(PAYLOAD_NAME)[1][1:],
        UPLOAD_DIR
        )
    breakpoint()
    return metadata, payload

def _get_crate_metadata(upload_dir: str):
    """Get metadata about the crate from the ro-crate-metadata.json file"""
    crate_metadata_path = os.path.join(upload_dir, "ro-crate-metadata.json")
    with open(crate_metadata_path, "rt") as crate_file:
        crate = json.load(crate_file)
        root = crate["@graph"][0]
    metadata = {}
    metadata["title"] = root.get("title")
    metadata["resource_title"] = root.get("title")
    metadata["description"] = root.get("description", "This is an RO-Crate of a database from the Online Heritage Resource Manager. Unfortunately it is not described, but you can explore the data using the included ro-crate-preview.html file.")
    # Add authors if available – delete if they are not, or it ruins the upload
    metadata["authors"] = [root.get("creator", "")]
    metadata["authors"] = [val for val in metadata["authors"] if val]
    if not metadata["authors"]:
        del metadata["authors"]

    return metadata

def clean_upload_data(ohrm: OHRM) -> int:
    os.system(f"rm -rf {os.path.join(UPLOAD_DIR, ohrm.name)}")
    os.system(f"rm {PAYLOAD_NAME}")
    return 1

if __name__ == "__main__":
    main()
