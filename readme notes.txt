Mongodb:
This part of the project connects to Mongo Database using MongoDB Atlas which is a fully managed cloud database service provided by MongoDB, Inc. Typescript is the language used here. Mongoose was used to interact with the data as Object-Document Mapper library.

Mongoose is a Node.js ODM for MongoDB, enabling developers to define data schemas, enforce validation rules, and seamlessly interact with the database. With schema definition, Mongoose adds structure to MongoDB, facilitating data validation for types, defaults, and custom rules. The library's middleware support allows developers to execute custom logic before or after operations, and its powerful query API simplifies the construction of complex queries, enhancing the overall development experience. Additionally, Mongoose eases connection management, providing a connection pool and handling events related to database connections.

 In this CRUD Operations are performed where the operations are performed on the models created which are equivalent to tables in an RDBMS. Data is created using different methods such as creating an instance of each model and then calling .save() on the resulting object, using model.create().  

In the read operations model.aggregate(), .findOne(), findById(), .exists(), .populate() chained queries, along with the .virtual, .methods, .static, .query options defined on the model, are used.
 
In the update operations model.findOneAndUpdate, model.updateMany, modelUsed.updateOne are used.
 
In the delete operations model.deleteMany(), model.findOneAndDelete(), model.deleteOne(), model.findByIdAndDelete() are used.

Apache-cassandra:

This is written in vanilla javascript and for this a custom made docker image of cassandra db is used. The custom image is created using the official docker image present in docker hub provided by apache. the cassandra.yaml file which handles the configuration/setup of the apache-cassandra db servers is replaced by a custom modified file in the new custom image created using dockerfile. Main approach in this implementation used is bash scripting where different scripts are created for execution of each operations and all these scripts are finally run using an npm package called shelljs. Automation is brought into place by using scripts for almost all operations like creating or deleting the custom cassandra image, starting a cassandra cluster or entirely destroying them, checking their active status and many more. Then for each of CRUD operations CQL scripts are written and stored in corresponding .cql files then a script is run each of these .cql script files.

in the create script, The CREATE KEYSPACE statements define two keyspaces, learn_cassandra_keyspaces and learn_cassandra_tables, with the latter employing the NetworkTopologyStrategy for replication. The CREATE TABLE statements showcase the creation of tables, such as my_table and users_by_country, specifying primary keys, data types, and additional settings like time-to-live and compaction strategy. Data insertion is demonstrated with the INSERT INTO statements, employing UUIDs and timestamps. Secondary indexes are created using the CREATE INDEX statements on the attributes column of the products table, enabling optimized querying. User-defined types, like address, are introduced, highlighting Cassandra's support for complex data structures. Additionally, the script features the creation of materialized views (cyclist_mat_view_rank_1) for efficient data retrieval and compound primary keys with clustering order in the calendarcalendarcalendar table. These options collectively illustrate the versatility and capabilities of Cassandra in managing distributed, scalable, and complex data models.

