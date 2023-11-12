module.exports.runSingleQuery = async ({ cypherQuery, session, message }) => {
  try {
    const result = await session.run(cypherQuery);
    console.log(message);
    return result;
  } catch (error) {
    console.error('Error running Cypher query:', error);
  } finally {
    return;
  }
};
