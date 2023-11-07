module.exports.runQuery = async ({ driver, cypherQuery, session, message }) => {
  try {
    const result = await session.run(cypherQuery);
    console.log(message);
    return result;
  } catch (error) {
    console.error('Error running Cypher query:', error);
  } finally {
    session.close();
    driver.close();
  }
};
