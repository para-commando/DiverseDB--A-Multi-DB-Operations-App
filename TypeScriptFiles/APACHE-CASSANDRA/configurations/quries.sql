------KEYSPACE QUERIES--------
CREATE KEYSPACE IF NOT EXISTS learn_cassandra_keyspaces
  WITH replication = {'class': 'NetworkTopologyStrategy', 'datacenter1': 2};

ALTER KEYSPACE IF EXISTS learn_cassandra_keyspaces
    WITH replication = {'class': 'NetworkTopologyStrategy', 'datacenter1' : 2};

DROP KEYSPACE IF EXISTS learn_cassandra_keyspaces;



----------TABLE QUERIES-----------

-----------CREATE OPERATIONS------------------
CREATE KEYSPACE IF NOT EXISTS learn_cassandra_tables
  WITH replication = {'class': 'NetworkTopologyStrategy', 'datacenter1': 2};


CREATE TABLE IF NOT EXISTS learn_cassandra_tables.my_table (
    user_id UUID PRIMARY KEY,
    username TEXT,
    email TEXT,
    registration_date TIMESTAMP
)
WITH comment = 'User data table'
AND default_time_to_live = 2592000
AND gc_grace_seconds = 864000
AND bloom_filter_fp_chance = 0.01
AND caching = {
    'keys' : 'ALL',
    'rows_per_partition' : 'NONE'
}
AND compaction = {
    'class' : 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy',
    'max_threshold' : 32,
    'min_threshold' : 4
}
AND compression = {
    'sstable_compression' : 'org.apache.cassandra.io.compress.LZ4Compressor',
    'chunk_length_kb' : 64
}
AND crc_check_chance = 0.5
AND dclocal_read_repair_chance = 0.1
AND max_index_interval = 2
AND memtable_flush_period_in_ms = 3600000
AND min_index_interval = 1
AND read_repair_chance = 0.1
AND speculative_retry = 'ALWAYS';


-- comment: A comment describing the purpose or content of the table.

-- default_time_to_live: Specifies the default TTL (Time to Live) for data in seconds. In this example, data will expire after 30 days (30 days * 24 hours * 60 minutes * 60 seconds).

-- gc_grace_seconds: The grace period for tombstone (deleted data) cleanup in seconds. Tombstones older than this period are eligible for removal.

-- bloom_filter_fp_chance: This option allows you to set the desired probability of a false positive when checking for the existence of data in the Bloom filter. It is expressed as a decimal value between 0 and 1, where 0 means "no false positives" (the Bloom filter is highly accurate but consumes more memory), and 1 means "accept any result" (the Bloom filter may produce many false positives but consumes less memory). When you perform a query, Cassandra consults the Bloom Filters associated with the table to determine if the queried data might exist within the table. If the Bloom Filter indicates a "positive" (meaning the data might exist), Cassandra proceeds with the actual read operation. If it indicates a "negative" (meaning the data definitely does not exist), Cassandra can avoid reading the data from storage, saving time and resources.

-- caching: 'keys': 'ALL': This part of the configuration specifies caching at the key level. It means that all individual keys (or rows) from the table should be cached in memory. When you retrieve data using primary keys or indexed columns, Cassandra will cache the result in memory to speed up subsequent reads. This is generally a good choice for frequently accessed and small-sized data that benefits from quick access.'rows_per_partition': 'NONE': This part of the configuration specifies caching at the partition level. A partition in Cassandra is a group of rows that share the same partition key. Setting 'NONE' means that rows within a partition won't be cached. In other words, it disables row-level caching. This might be useful when you have large partitions with many rows, and caching individual rows could consume too much memory. By setting it to 'NONE,' you ensure that Cassandra only caches at the key level.

-- compaction: Defines the compaction strategy and related parameters. Here, we use the SizeTieredCompactionStrategy with specific threshold settings.

-- compression: Specifies the compression options. LZ4Compressor is used for compressing data stored on disk in Cassandra's SSTables (Sorted String Tables), which are the primary storage format for data in a Cassandra cluster.LZ4 is known for its low CPU usage during compression and decompression, making it a good choice when you want to minimize the impact on query response times

-- crc_check_chance:Checksum Verification: When data is read from disk in Cassandra, it's possible that the data might have been corrupted due to various reasons, such as disk errors or hardware issues. To ensure data integrity, Cassandra can calculate a CRC checksum for the data when it's written to disk.CRC Check Chance: The crc_check_chance setting allows you to specify the likelihood (in the form of a percentage) that Cassandra will perform a CRC checksum verification when reading data from disk. For example, if you set crc_check_chance to 0.1 (which corresponds to 10%), Cassandra will perform the CRC check for approximately 10% of the read operations.Trade-off: The use of CRC checksum verification provides strong data integrity guarantees but comes at the cost of some additional CPU overhead. By allowing you to configure the crc_check_chance, Cassandra gives you a way to balance data integrity and performance. You can choose a value that aligns with your specific requirements and performance considerations. Default Value: If crc_check_chance is not explicitly set in the configuration, Cassandra uses a default value of 1.0, indicating that CRC checks are performed for all data reads. This ensures maximum data integrity at the expense of potential performance impact..

-- dclocal_read_repair_chance: A read repair operation involves reconciling the data across the replicas. Specifically, the coordinator node sends a "repair request" to the replicas that contain different versions of the data. These replicas then exchange data to bring their copies into agreement.Repairing Data: During the repair process, replicas may exchange data or use techniques like Merkle trees to identify the differences and update their copies of the data to match the most recent version. Once the repair is complete, all replicas should have consistent and up-to-date data..if you set dclocal_read_repair_chance to 1. Then the probability of consistent read will trigger read repair is 1. So every time you perform read request, cassandra will trigger read repair, that is very resource-intensive.Recommendations: if the table is for time series data, it can be set to 0 (zero). For other tables, the more performant strategy is to set dc_local_read_repair_chance to 0.1

-- max_index_interval:  The max_index_interval parameter in Cassandra controls the maximum number of rows that can be skipped between index partitions. This parameter is important for performance because it prevents the Cassandra database from having to scan too many rows to find the data it needs..
-- Skipping indexed partitions in Cassandra means that the database will not scan all of the rows in an index partition to find the data it needs. Instead, the database will skip a certain number of rows between each index partition. This can improve performance because it reduces the number of rows that the database has to scan. However, skipping indexed partitions can also lead to errors if the database is not able to find the data it needs. For example, if the database skips too many rows, it may miss the data it is looking for.

-- memtable_flush_period_in_ms: Defines how often data is flushed from the memtable to SSTables in milliseconds.

 
-- read_repair_chance: read_repair_chance affects read operations for the entire table, regardless of the data center from which the read request originates.dclocal_read_repair_chance, on the other hand, is specific to the local data center where the coordinator node for the read request is located. It allows you to adjust read repair behavior independently for each data center.

-- speculative_retry: Configures speculative query retries. In this example, speculative retries are set to 'ALWAYS,' meaning that Cassandra will retry queries if it suspects slow responses from replicas.

 ALTER TABLE learn_cassandra_tables.my_table DROP new_users;

 ALTER TABLE learn_cassandra_tables.my_table ADD new_users text ;
 ALTER TABLE learn_cassandra_tables.my_table ADD new_users_2 text ;
 ALTER TABLE learn_cassandra_tables.my_table DROP new_users_2;

-- Inserting data into the Cassandra table

-- Row 1
INSERT INTO learn_cassandra_tables.my_table (user_id, username, email, registration_date)
VALUES (UUID(), 'user1', 'user1@example.com', toTimestamp(now()));

-- Row 2
INSERT INTO learn_cassandra_tables.my_table (user_id, username, email, registration_date)
VALUES (UUID(), 'user2', 'user2@example.com', toTimestamp(now()));

-- Row 3
INSERT INTO learn_cassandra_tables.my_table (user_id, username, email, registration_date)
VALUES (UUID(), 'user3', 'user3@example.com', toTimestamp(now()));

-- Row 4
INSERT INTO learn_cassandra_tables.my_table (user_id, username, email, registration_date)
VALUES (UUID(), 'user4', 'user4@example.com', toTimestamp(now()));

-- Row 5
INSERT INTO learn_cassandra_tables.my_table (user_id, username, email, registration_date)
VALUES (UUID(), 'user5', 'user5@example.com', toTimestamp(now()));

CREATE TABLE learn_cassandra.users_by_country (
    country text,
    user_email text,
    first_name text,
    last_name text,
    age smallint,
    PRIMARY KEY ((country), user_email)
);


INSERT INTO learn_cassandra.users_by_country (country,user_email,first_name,last_name,age) VALUES('US', 'john@email.com', 'John','Wick',55);

INSERT INTO learn_cassandra.users_by_country (country,user_email,first_name,last_name,age)
  VALUES(de'UK', 'peter@email.com', 'Peter','Clark',65);

INSERT INTO learn_cassandra.users_by_country (country,user_email,first_name,last_name,age)
  VALUES('UK', 'bob@email.com', 'Bob','Sandler',23);

INSERT INTO learn_cassandra.users_by_country (country,user_email,first_name,last_name,age)
  VALUES('UK', 'alice@email.com', 'Alice','Brown',26);


SELECT * FROM learn_cassandra.users_by_country WHERE country='US';




