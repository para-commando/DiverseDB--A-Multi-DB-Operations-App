module.exports.runMultipleQueries = async ({ cypherQueries, session }) => {
  try {
    // const cypherQueries = [
    //   { query: `MATCH (N) RETURN N`, message: 'getAll success' },
    //   { query: `MATCH (N:Customer) RETURN N`, message: 'getCustomer success' },
    // ];

    let transaction = await session.beginTransaction();
    let result = '';
    cypherQueries.forEach(async (ele) => {
      result = await transaction.run(ele.query);
      ele.result = result;
      ele.isSuccess = true;
      console.log(
        '🚀 ~ file: neo4jRunQuerycopy.js:22 ~ cypherQuery.forEach ~ ele.message:',
        ele.message
      );
    });
  } catch (error) {
    console.error('Error running Cypher query:', error);
  } finally {
    await transaction.close();
    return result;
  }
};
