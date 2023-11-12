module.exports.runMultipleQueries = async ({ cypherQueries, session }) => {
  let transaction = await session.beginTransaction();
  try {

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
    return result;
  } catch (error) {
    console.error('Error running Cypher query:', error);
  } finally {
    await transaction.close();
  }
};
