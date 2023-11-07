const { driver } = require('./neo4jInstanceDriverConnect');
require('dotenv').config();
const { runQuery } = require('./neo4jRunQuery');

// Create a session to run Cypher queries
const session = driver.session();

// Example Cypher query
const cypherQuery = `MATCH (N) RETURN N`;

runQuery({
  driver: driver,
  cypherQuery: cypherQuery,
  session: session,
  message: 'Read Operations Successful',
});
