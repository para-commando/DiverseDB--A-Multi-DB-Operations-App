# source ./queryExecuter.sh cassandra-node-1 "CREATE KEYSPACE IF NOT EXISTS learn_cassandra_keyspaces WITH replication = {'class': 'NetworkTopologyStrategy', 'datacenter1': 2};"

./queryExecuter.sh cassandra-node-1 createOpsQueries.cql

