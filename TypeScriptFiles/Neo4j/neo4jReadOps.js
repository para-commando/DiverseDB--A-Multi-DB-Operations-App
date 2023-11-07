const { driver } = require('./neo4jInstanceDriverConnect');
const { runMultipleQueries } = require('./neo4jRunMultipleQueries');

// Create a session to run Cypher queries
const readOpsSession = driver.session();

module.exports.readOps = async () => {
  const cypherQuery = [
    { query: `MATCH (N) RETURN N`, message: 'getAll success' },
    { query: `MATCH (N:Customer) RETURN N`, message: 'getCustomer success' },
  ];

  const result = runMultipleQueries({
    cypherQueries: cypherQuery,
    session: readOpsSession,
  });
  console.log(
    '🚀 ~ file: neo4jReadOps.js:18 ~ module.exports.readOps= ~ result:',
    result
  );
  readOpsSession.close();
  driver.close();
};
