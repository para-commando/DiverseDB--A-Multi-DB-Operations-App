------KEYSPACE QUERIES--------
CREATE KEYSPACE IF NOT EXISTS learn_cassandra_keyspaces
  WITH replication = {'class': 'NetworkTopologyStrategy', 'datacenter1': 2};

ALTER KEYSPACE IF EXISTS learn_cassandra_keyspaces
    WITH replication = {'class': 'NetworkTopologyStrategy', 'datacenter1' : 2};

DROP KEYSPACE IF EXISTS learn_cassandra_keyspaces;



