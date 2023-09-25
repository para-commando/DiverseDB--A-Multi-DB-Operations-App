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

CREATE TABLE learn_cassandra_tables.users_by_country (
    country text,
    user_email text,
    first_name text,
    last_name text,
    age smallint,
    PRIMARY KEY ((country), user_email)
);


INSERT INTO learn_cassandra_tables.users_by_country (country,user_email,first_name,last_name,age) VALUES('US', 'john@email.com', 'John','Wick',55);

INSERT INTO learn_cassandra_tables.users_by_country (country,user_email,first_name,last_name,age)
  VALUES('UK', 'peter@email.com', 'Peter','Clark',65);

INSERT INTO learn_cassandra_tables.users_by_country (country,user_email,first_name,last_name,age)
  VALUES('UK', 'bob@email.com', 'Bob','Sandler',23);

INSERT INTO learn_cassandra_tables.users_by_country (country,user_email,first_name,last_name,age)
  VALUES('UK', 'alice@email.com', 'Alice','Brown',26);


SELECT * FROM learn_cassandra_tables.users_by_country WHERE country='US';
 
CREATE TYPE learn_cassandra_tables.address (
    street text,
    city text,
    zip text,
    contact_no text
);
CREATE TABLE learn_cassandra_tables.products (
  id UUID PRIMARY KEY,
  name VARCHAR,
  is_available BOOLEAN,
  description TEXT,
  price DECIMAL,
  website_ip_address  INET,
  quantity INT,
  in_stock BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  images BLOB,
  categories TUPLE<INT, TEXT>,
  attributes MAP<TEXT, TEXT>,
  reviews LIST<frozen<MAP<TEXT, INT>>>,
  warehouse_address address,
);

INSERT INTO learn_cassandra_tables.products (id, name, is_available, description, price, website_ip_address, quantity, in_stock, created_at, updated_at, images, categories, attributes, reviews, warehouse_address)
VALUES (
  uuid(),
  'Product 1',
  true,
  'Description for Product 1',
  49.99,
  '192.168.1.100',
  100,
  true,
  toTimestamp(now()),
  toTimestamp(now()),
  0x0123456789ABCDEF,  -- BLOB (hexadecimal representation)
  (1, 'Category 1'),   -- TUPLE<INT, TEXT>
  {'color': 'Blue', 'weight': '2 lbs'},  -- MAP<TEXT, TEXT>
  [{ 'user1': 5, 'user2': 4 }],  -- LIST<frozen<MAP<TEXT, INT>>>
  { street: '123 Main St', city: 'City1', zip: '12345', contact_no: '123-456-7890' } -- User-defined Type address
);

INSERT INTO learn_cassandra_tables.products (id, name, is_available, description, price, website_ip_address, quantity, in_stock, created_at, updated_at, images, categories, attributes, reviews, warehouse_address)
VALUES (
  uuid(),
  'Product 2',
  false,
  'Description for Product 2',
  29.99,
  '192.168.1.101',
  50,
  false,
  toTimestamp(now()),
  toTimestamp(now()),
  0xABCDEF0123456789,  -- BLOB (hexadecimal representation)
  (2, 'Category 2'),   -- TUPLE<INT, TEXT>
  {'color': 'Red', 'weight': '3 lbs'},  -- MAP<TEXT, TEXT>
  [{ 'user3': 4, 'user4': 5 }],  -- LIST<frozen<MAP<TEXT, INT>>>
  { street: '456 Elm St', city: 'City2', zip: '67890', contact_no: '987-654-3210' } -- User-defined Type address
);


-- user defined aggregate functions (UDAF)
CREATE TABLE learn_cassandra_tables.sales (
  transaction_id UUID PRIMARY KEY,
  category TEXT,
  price DECIMAL
);

-- Insert some sample data
INSERT INTO learn_cassandra_tables.sales (transaction_id, category, price)
VALUES (uuid(), 'Electronics', 500.00);

INSERT INTO learn_cassandra_tables.sales (transaction_id, category, price)
VALUES (uuid(), 'Clothing', 120.50);

INSERT INTO learn_cassandra_tables.sales (transaction_id, category, price)
VALUES  (uuid(), 'Clothing', 75.25);
 
INSERT INTO learn_cassandra_tables.sales (transaction_id, category, price)
VALUES (uuid(), 'Electronics', 300.00);
INSERT INTO learn_cassandra_tables.sales (transaction_id, category, price)
VALUES (uuid(), 'Electronics', 450.00);

CREATE FUNCTION IF NOT EXISTS learn_cassandra_tables.sum_agg(state double, val double)
  CALLED ON NULL INPUT
  RETURNS double
  LANGUAGE java
  AS '
    if (state == null) {
      state = 0.0;
    }
    return state + val;
  ';
CREATE AGGREGATE IF NOT EXISTS learn_cassandra_tables.total_price_agg(double)
  SFUNC sum_agg
  STYPE double
  INITCOND null;

 
SELECT category, total_price_agg(CAST(price AS double)) AS total_price FROM learn_cassandra_tables.sales  where category= 'Electronics' ALLOW FILTERING;

CREATE OR REPLACE FUNCTION learn_cassandra_tables.fifteenPctDiscountedPrice(amount double)
CALLED ON NULL INPUT
RETURNS double
LANGUAGE java
AS '
double result = amount-(amount * 0.15);
    return result;
';

SELECT category, price AS initialPrice, fifteenPctDiscountedPrice(CAST(price AS double)) AS discountedPrice from learn_cassandra_tables.sales;

-----------DELETE OPERATIONS--------------

TRUNCATE learn_cassandra_tables.my_table;
DROP TABLE learn_cassandra_tables.my_table;
TRUNCATE learn_cassandra.users_by_country
DROP TABLE learn_cassandra.users_by_country;

DROP Table learn_cassandra_tables.products;
DROP TYPE learn_cassandra_tables.address;
DROP TYPE learn_cassandra_tables.phone;

