#!/bin/bash

# Get the directory of the script
SCRIPT_DIR="$(dirname "$0")"

# Check if the container name is provided as the first argument, otherwise use a default
CONTAINER_NAME="${1:-cassandra-node-1}"

# Check if the CQL script file is provided as the second argument
CQL_FILE="${2:-myqueries.cql}"

# Run cqlsh inside the specified container, passing the CQL script file as standard input
docker exec -i $CONTAINER_NAME cqlsh < "$SCRIPT_DIR/$CQL_FILE"
