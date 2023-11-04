const neo4j = require('neo4j-driver');
require('dotenv').config();

// Set up the Neo4j driver
module.exports.driver = neo4j.driver(
  process.env.NEO4J_INSTANCE_CONNECTION_URL, // URL to your Neo4j server
  neo4j.auth.basic(process.env.NEO4J_INSTANCE_USERNAME, process.env.NEO4J_INSTANCE_PASSWORD)
);
