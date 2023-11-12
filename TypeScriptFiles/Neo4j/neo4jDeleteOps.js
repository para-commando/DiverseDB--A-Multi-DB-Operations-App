require('dotenv').config();
const { runSingleQuery } = require('./neo4jRunSingleQuery');

// Create a session to run Cypher queries

module.exports.deleteOps = async (driver) => {
  const session = driver.session();

  const cypherQuery = `MATCH (N) DETACH DELETE N`;

  await runSingleQuery({
    driver: driver,
    cypherQuery: cypherQuery,
    session: session,
    message: 'Delete Operations Successful',
  });
  session.close();
  return true;

};
