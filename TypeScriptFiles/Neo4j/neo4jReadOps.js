const { driver } = require('./neo4jInstanceDriverConnect');
require('dotenv').config();
const { runQuery } = require('./neo4jRunSingleQuery');

// Create a session to run Cypher queries
const session = driver.session();

module.exports.readOps = async () => {
  // const cypherQuery = [
  //   { query: `MATCH (N) RETURN N`, message: 'getAll success' },
  //   { query: `MATCH (N:Customer) RETURN N`, message: 'getCustomer success' },
  // ];
  const cypherQuery = `MATCH (N) RETURN N
  MATCH (N:Customer) RETURN N`;
  debugger;
  const result = await session.run(cypherQuery);

  session.close();
  driver.close();
  cypherQuery.forEach(async (ele) => {
    result = await runQuery({
      driver: driver,
      cypherQuery: ele.query,
      session: session,
      message: ele.message,
    });

    console.log(
      '🚀 ~ file: neo4jReadOps.js:16 ~ cypherQuery.forEach ~ result:',
      result
    );
  });
};
