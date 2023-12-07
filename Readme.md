**Overview**

***DiverseDB - A Multi-DB Operations App***

![Example Image](./images/overviewImage.jpg)

DiverseDB is a comprehensive project designed for performing operations on multiple databases, showcasing its versatility in seamlessly interacting with various database systems. The project's primary objective is to provide a unified platform for developers to conduct Create, Read, Update, and Delete (CRUD) operations across diverse database technologies, enabling efficient management and manipulation of data.

**Introduction**

![Example Image](./images/introductory.jpg)

The project encompasses four major database systems: MongoDB, Apache Cassandra, MySQL, and Neo4j, each represented by a dedicated module within the application. Leveraging TypeScript, JavaScript, and advanced ORM technologies like Mongoose, TypeORM, and Neo4j-Driver, DiverseDB ensures a consistent and streamlined experience for developers working across different database paradigms.

The MongoDB module utilizes MongoDB Atlas, a cloud-based service, and Mongoose, a Node.js ODM, to facilitate schema definition and data validation. In contrast, the Apache Cassandra module employs vanilla JavaScript and bash scripting for automation, creating a custom Docker image for Cassandra deployment. The MySQL module leverages TypeScript and TypeORM, simplifying database interactions with efficient query-building capabilities. Finally, the Neo4j module utilizes the neo4j-driver package to connect to an instance of Neo4j, showcasing its capabilities in managing graph-based data models.


**MongoDB:**

![Example Image](./images/mongodb.png)


- Connects to MongoDB via MongoDB Atlas, a fully managed cloud service.
- TypeScript is the primary language, and Mongoose serves as the Object-Document Mapper.
- Mongoose in Node.js allows schema definition, validation, and seamless database interaction.
- CRUD Operations:
  - Models used, akin to tables in RDBMS.
  - Data creation methods include creating model instances and using `model.create()`.
  - Read operations use methods like `model.aggregate()`, `.findOne()`, `findById()`.
  - Update operations use `model.findOneAndUpdate`, `model.updateMany`, etc.
  - Delete operations include `model.deleteMany()`, `model.findOneAndDelete()`, etc.

**Apache Cassandra:**

![Example Image](./images/apachecCassandra.png)


- Implemented in vanilla JavaScript.
- Custom Docker image for Cassandra using the official image with a modified `cassandra.yaml`.
- Bash scripting automation using ShellJS for operations like image creation, cluster management.
- CQL scripts for CRUD operations:
  - CREATE KEYSPACE for replication strategies.
  - CREATE TABLE for defining tables with various settings.
  - Secondary indexes, user-defined types, and materialized views illustrated.
  - ALTER KEYSPACE for dynamic replication strategy changes.
  - UPDATE and conditional updates in tables.
  - DROP KEYSPACE, TRUNCATE, DELETE, and DROP TYPE for cleanup and removal.

**MySQL:**

![Example Image](./images/mysql.png)


- TypeScript with TypeORM for database queries.
- Initialization of a datasource with credentials, entity creation for table interaction.
- npm scripts for CLI operations, including migrations, entities, and subscribers.
- CRUD Operations:
  - Create queries use query builders and support raw queries.
  - Read queries support joins, locks, transactions, pagination, and more.
  - Update operations can be performed with insert queries as an upsert alternative.
  - Delete operations include a soft delete option with timestamp marking.

**Neo4j:**

![Example Image](./images/Neo4j.png)


- Utilizes the npm package `neo4j-driver` to connect to Neo4j via AuraDB.
- Session creation for query execution with options like `.run()` and `.executeWrite()`.
- Create operations:
  - Nodes created using `session.run()`, relationships via `session.executeWrite()`.
  - Custom dataset created with Mockaroo, published on Google Sheets.
- Update operations populate nodes and relationships with values using `session.run()`.
- Read operations navigate nodes for data retrieval; transactional queries using `session.beginTransaction()`.
- Delete operations entail removing the entire graph data model.
