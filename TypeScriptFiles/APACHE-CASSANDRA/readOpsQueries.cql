SELECT * FROM learn_cassandra_tables.users_by_country WHERE country='US';

SELECT * FROM learn_cassandra_tables.products
WHERE attributes CONTAINS KEY 'color';

SELECT * FROM learn_cassandra_tables.products
WHERE attributes['color'] = 'Red';

SELECT WRITETIME(category) FROM learn_cassandra_tables.sales;

SELECT category, total_price_agg(CAST(price AS double)) AS total_price FROM learn_cassandra_tables.sales where category= 'Electronics' ALLOW FILTERING;

SELECT category, price AS initialPrice, fifteenPctDiscountedPrice(CAST(price AS double)) AS discountedPrice from learn_cassandra_tables.sales;

SELECT * FROM learn_cassandra_tables.cyclist_mat_view_rank_1;

-- To get time remaining for data to get erased
SELECT TTL(cyclist_name)
FROM learn_cassandra_tables.rank_by_year_and_name
WHERE race_year=2019 and race_name = '4th Tour of Beijing';

SELECT *
FROM learn_cassandra_tables.rank_by_year_and_name
PER PARTITION LIMIT 2;

SELECT *
FROM learn_cassandra_tables.rank_by_year_and_name
WHERE rank = 1;