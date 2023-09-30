

IS_IMAGE_PRESENT = source ./isImagePresent.sh 
IS_CONSTAINER_PRESENT = source ./isContainerPresent.sh
IS_CONTAINER_RUNNING = source ./isContainerRunning.sh
if ["$IS_IMAGE_PRESENT"="false"]; then
   source ./configurations/build-custom-cassandra-image.sh
fi

if ["$IS_CONSTAINER_PRESENT" = "false"]; then
 source ./configurations/initial-cluster-setup.sh
else if ["$IS_CONTAINER_RUNNING" = "false"]; then
   source ./configurations/start-cluster.sh
fi


./queryExecuter.sh cassandra-node-1 createOpsQueries.cql

./queryExecuter.sh cassandra-node-1 readOpsQueries.cql

./queryExecuter.sh cassandra-node-1 updateOpsQueries.cql

./queryExecuter.sh cassandra-node-1 deleteOpsQueries.cql
