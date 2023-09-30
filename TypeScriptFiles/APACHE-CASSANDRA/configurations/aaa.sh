#!/bin/bash

# Check if the container name is provided as the first argument, otherwise use a default
CONTAINER_NAME="${1:-cassandra-node-1}"

# Check if the CQL command is provided as the second argument, otherwise use a default
CQL_COMMAND="${2:-DESCRIBE KEYSPACES;}"

# Run cqlsh inside the specified container
docker exec -it $CONTAINER_NAME cqlsh -e "$CQL_COMMAND"
