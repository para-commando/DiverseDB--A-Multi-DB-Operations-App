const { driver } = require('./neo4jInstanceDriverConnect');
require('dotenv').config();
const { runQuery } = require('./neo4jRunSingleQuery');

// Create a session to run Cypher queries
const session = driver.session();

module.exports.deleteOps = async () => {
  const cypherQuery = `MATCH (N) DETACH DELETE N`;

  await runQuery({
    driver: driver,
    cypherQuery: cypherQuery,
    session: session,
    message: 'Delete Operations Successful',
  });
};
