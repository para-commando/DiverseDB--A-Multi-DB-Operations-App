
ALTER KEYSPACE IF EXISTS learn_cassandra_keyspaces WITH replication = {'class': 'NetworkTopologyStrategy', 'datacenter1' : 1};

UPDATE learn_cassandra_tables.rank_by_year_and_name SET cyclist_name = 'bob' WHERE race_name='4th Tour of Beijing1' AND race_year = 2014 AND RANK=1;

UPDATE learn_cassandra_tables.rank_by_year_and_name USING TTL 10000 SET cyclist_name = 'bob' WHERE race_name='4th Tour of Beijing1' AND race_year = 2014 AND RANK=1;

-- after the specified seconds the value of that column will be null

-- change the id value accordingly
UPDATE learn_cassandra_tables.products USING TTL 15 SET alternateNames = ['Criterium du Dauphine','Tour de Suisse'] WHERE id =065dde58-d4e3-408b-8819-3a7389df4893 IF EXISTS;
UPDATE learn_cassandra_tables.products
SET alternateNames = ['Tour de France'] + alternateNames WHERE id =065dde58-d4e3-408b-8819-3a7389df4893 IF alternateNames[0]='Criterium du Dauphine';
UPDATE learn_cassandra_tables.products
SET alternateNames = alternateNames + ['Tour de France11'] WHERE id =065dde58-d4e3-408b-8819-3a7389df4893 IF EXISTS;

UPDATE learn_cassandra_tables.products
SET alternateNames[2] ='Tour de France__2' WHERE id =065dde58-d4e3-408b-8819-3a7389df4893 IF EXISTS;
UPDATE learn_cassandra_tables.products 
SET alternateNames = alternateNames - ['Criterium du Dauphine'] WHERE id =065dde58-d4e3-408b-8819-3a7389df4893 IF EXISTS;


-- after the specified seconds the added element is gone
UPDATE learn_cassandra_tables.products USING TTL 10
SET alternateNames[1] = 'Vuelta Ciclista a Venezuela22222' WHERE id =065dde58-d4e3-408b-8819-3a7389df4893 IF EXISTS;


ALTER TABLE learn_cassandra_tables.my_table ADD new_users text ;
ALTER TABLE learn_cassandra_tables.my_table ADD new_users_2 text ;
ALTER TABLE learn_cassandra_tables.my_table DROP new_users_2;
ALTER TABLE learn_cassandra_tables.my_table DROP new_users;
