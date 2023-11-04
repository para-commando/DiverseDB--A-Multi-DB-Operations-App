const neo4j = require('neo4j-driver');
require('dotenv').config();
// Set up the Neo4j driver
 const driver = neo4j.driver(
  process.env.NEO4J_INSTANCE_CONNECTION_URL, // URL to your Neo4j server
  neo4j.auth.basic(process.env.NEO4J_INSTANCE_USERNAME, process.env.NEO4J_INSTANCE_PASSWORD)
);

// Create a session to run Cypher queries
const session = driver.session();
// console.log("🚀 ~ file: neo.js:11 ~ session:", session)

// Example Cypher query
const cypherQuery = `
 MATCH (N) RETURN N;
`;

// Run the query
session
  .run(cypherQuery)
  .then((result) => {
    console.log('sasfdsdsdfsdfasdfsadfads');
    result.records.forEach((record) => {
      console.log("🚀 ~ file: neo.js:24 ~ result.records.forEach ~ record._fields:", record._fields)
      // console.log(record[1],record[2]); // Access node properties
    });
  })
  .catch((error) => {
    console.error('Error running Cypher query:', error);
  })
  .finally(() => {
    session.close();
    driver.close();
  });
