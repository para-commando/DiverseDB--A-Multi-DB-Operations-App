CREATE KEYSPACE IF NOT EXISTS learn_cassandra_keyspaces WITH replication = {'class': 'NetworkTopologyStrategy', 'datacenter1': 2};


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
  alternateNames LIST<TEXT>,
  warehouse_address address,
);

INSERT INTO learn_cassandra_tables.products (id, name, is_available, description, price, website_ip_address, quantity, in_stock, created_at, updated_at, images, categories, attributes, reviews, alternateNames, warehouse_address)
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
  ['mango', 'banana'],
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

-- this index is required as the query below it requires it for its execution otherwise we would need to use ALLOW filtering which can affect performance
CREATE INDEX IF NOT EXISTS attributes_index
ON learn_cassandra_tables.products ( KEYS (attributes) );



-- this index is required as the query below it requires it for its execution otherwise we would need to use ALLOW filtering which can affect performance
CREATE INDEX IF NOT EXISTS attributes_values_index
ON learn_cassandra_tables.products ( ENTRIES(attributes) );
 
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


CREATE OR REPLACE FUNCTION learn_cassandra_tables.fifteenPctDiscountedPrice(amount double)
CALLED ON NULL INPUT
RETURNS double
LANGUAGE java
AS '
double result = amount-(amount * 0.15);
    return result;
';


CREATE TABLE IF NOT EXISTS learn_cassandra_tables.rank_by_year_and_name (
  race_year int,
  race_name text,
  cyclist_name text,
  rank int,
  PRIMARY KEY ((race_year, race_name), rank)
);

INSERT INTO learn_cassandra_tables.rank_by_year_and_name (race_year, race_name, rank, cyclist_name) VALUES (2014, '4th Tour of Beijing', 1, 'Phillippe GILBERT');
INSERT INTO learn_cassandra_tables.rank_by_year_and_name (race_year, race_name, rank, cyclist_name) VALUES (2014, '4th Tour of Beijing', 2, 'Daniel MARTIN');
INSERT INTO learn_cassandra_tables.rank_by_year_and_name (race_year, race_name, rank, cyclist_name) VALUES (2014, '4th Tour of Beijing', 3, 'Johan Esteban CHAVES');
INSERT INTO learn_cassandra_tables.rank_by_year_and_name (race_year, race_name, rank, cyclist_name) VALUES (2014, 'Tour of Japan - Stage 4 - Minami > Shinshu', 1, 'Daniel MARTIN');
INSERT INTO learn_cassandra_tables.rank_by_year_and_name (race_year, race_name, rank, cyclist_name) VALUES (2014, 'Tour of Japan - Stage 4 - Minami > Shinshu', 2, 'Johan Esteban CHAVES');
INSERT INTO learn_cassandra_tables.rank_by_year_and_name (race_year, race_name, rank, cyclist_name) VALUES (2014, 'Tour of Japan - Stage 4 - Minami > Shinshu', 3, 'Benjamin PRADES');
INSERT INTO learn_cassandra_tables.rank_by_year_and_name (race_year, race_name, rank, cyclist_name) VALUES (2015, 'Giro d''Italia - Stage 11 - Forli > Imola', 1, 'Ilnur ZAKARIN');
INSERT INTO learn_cassandra_tables.rank_by_year_and_name (race_year, race_name, rank, cyclist_name) VALUES (2015, 'Giro d''Italia - Stage 11 - Forli > Imola', 2, 'Carlos BETANCUR');
INSERT INTO learn_cassandra_tables.rank_by_year_and_name (race_year, race_name, rank, cyclist_name) VALUES (2015, 'Tour of Japan - Stage 4 - Minami > Shinshu', 1, 'Benjamin PRADES');
INSERT INTO learn_cassandra_tables.rank_by_year_and_name (race_year, race_name, rank, cyclist_name) VALUES (2015, 'Tour of Japan - Stage 4 - Minami > Shinshu', 2, 'Adam PHELAN');
INSERT INTO learn_cassandra_tables.rank_by_year_and_name (race_year, race_name, rank, cyclist_name) VALUES (2015, 'Tour of Japan - Stage 4 - Minami > Shinshu', 3, 'Thomas LEBAS');

-- Add IF NOT EXISTS to the command to ensure that the operation is not performed if a row with the same primary key already exists
-- returns true when data is new and returns the existing data if data is already present
INSERT INTO learn_cassandra_tables.rank_by_year_and_name (race_year, race_name, rank, cyclist_name) VALUES (2014, '4th Tour of Beijing', 1, 'Phillippe GILBERT') IF NOT EXISTS;

INSERT INTO learn_cassandra_tables.rank_by_year_and_name (race_year, race_name, rank, cyclist_name) VALUES (2019, '4th Tour of Beijing', 1, 'Phillippe GILBERT') IF NOT EXISTS USING  TTL 10000;



-- Materialized view
CREATE MATERIALIZED VIEW learn_cassandra_tables.cyclist_mat_view_rank_1 AS SELECT * FROM learn_cassandra_tables.rank_by_year_and_name WHERE race_name IS NOT NULL AND race_year IS NOT NULL AND rank=1 PRIMARY KEY (rank, race_name, race_year);


-- this index is required as the query below it requires it for its execution otherwise we would need to use ALLOW filtering which can affect performance
CREATE INDEX IF NOT EXISTS rank_idx
ON learn_cassandra_tables.rank_by_year_and_name (rank);
-- Tip: The database does not support queries with logical disjunctions (OR).



CREATE TABLE IF NOT EXISTS learn_cassandra_tables.calendarcalendarcalendar (
  race_id int,
  race_name text,
  race_start_date timestamp,
  race_end_date timestamp,
  PRIMARY KEY (
    race_id, race_start_date, race_end_date
  )
) WITH CLUSTERING ORDER BY (
  race_start_date DESC, race_end_date DESC
);

-- Use an IN condition on the last column of a compound primary key only when it is preceded by equality conditions for all preceding columns of the primary key.
