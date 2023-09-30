DROP KEYSPACE IF EXISTS learn_cassandra_keyspaces;

TRUNCATE learn_cassandra_tables.my_table;
DROP TABLE learn_cassandra_tables.my_table;
TRUNCATE learn_cassandra_tables.users_by_country;
DROP TABLE learn_cassandra_tables.users_by_country;



DELETE attributes['weight'] FROM learn_cassandra_tables.products WHERE id =065dde58-d4e3-408b-8819-3a7389df4893 IF EXISTS;

DELETE reviews[0] FROM learn_cassandra_tables.products WHERE id =065dde58-d4e3-408b-8819-3a7389df4893 IF EXISTS;

DROP Table learn_cassandra_tables.products;

DROP TYPE learn_cassandra_tables.address;

DELETE cyclist_name FROM learn_cassandra_tables.rank_by_year_and_name where race_year=2019 AND race_name='4th Tour of Beijing' AND rank=1 IF EXISTS;

DELETE cyclist_name FROM learn_cassandra_tables.rank_by_year_and_name where race_year=2014 AND race_name='4th Tour of Beijing' AND rank=2 IF cyclist_name='Daniel MARTIN';