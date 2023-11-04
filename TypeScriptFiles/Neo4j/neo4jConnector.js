const neo4j = require('neo4j-driver');
const {driver} = require ('./neo4jInstanceDriverConnect')
require('dotenv').config();


// Create a session to run Cypher queries
const session = driver.session();

// Example Cypher query
const cypherQuery = `
 MATCH (N) RETURN N;
`;

async function runQuery() {
  try {
    const result = await session.run(cypherQuery);

    result.records.forEach((record) => {
      console.log("🚀 ~ record._fields:", record._fields);
      // Access node properties
    });
  } catch (error) {
    console.error('Error running Cypher query:', error);
  } finally {
    session.close();
    driver.close();
  }
}

runQuery();
