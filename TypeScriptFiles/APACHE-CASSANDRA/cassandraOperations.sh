#!/bin/bash

IS_IMAGE_PRESENT=$(./isImagePresent.sh)
IS_CONTAINER_1_PRESENT=$(./isContainerPresent.sh "cassandra-node-1")
IS_CONTAINER_2_PRESENT=$(./isContainerPresent.sh "cassandra-node-2")

if [ "$IS_IMAGE_PRESENT" = "false" ]; then
   echo "Concerned image was not present, building it..."
   cd configurations
   source ./build-custom-cassandra-image.sh
   sleep 3
   source ./initial-cluster-setup.sh
   cd ..
elif [ "$IS_CONTAINER_1_PRESENT" = "false" ] || [ "$IS_CONTAINER_2_PRESENT" = "false" ]; then
   cd configurations
   echo "concerned container(s) is/are absent, creating it..."  
   source ./initial-cluster-setup.sh
   cd ..
else 
   cd configurations
   echo "containers are not running, starting it..."
   source ./start-cluster.sh
   cd ..
fi

echo "starting create query operations..."
./queryExecuter.sh cassandra-node-1 createOpsQueries.cql
sleep 2
echo "starting read query operations..."
./queryExecuter.sh cassandra-node-1 readOpsQueries.cql
sleep 2
echo "starting update query operations..."
./queryExecuter.sh cassandra-node-1 updateOpsQueries.cql
sleep 2
echo "starting delete query operations..."
./queryExecuter.sh cassandra-node-1 deleteOpsQueries.cql
