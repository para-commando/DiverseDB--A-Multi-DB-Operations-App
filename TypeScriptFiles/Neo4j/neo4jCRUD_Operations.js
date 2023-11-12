const { createOps } = require('./neo4jCreateOps');
const { readOps } = require('./neo4jReadOps');
const { updateOps } = require('./neo4jUpdateOps');
const { deleteOps } = require('./neo4jDeleteOps');
const { driver } = require('./neo4jInstanceDriverConnect');

const neo4jCRUD_Operations = async () => {
  try {
    await createOps(driver);

    await updateOps(driver);

    await readOps(driver);

    await deleteOps(driver);
  } catch (e) {
    console.log(
      '🚀 ~ file: neo4jCRUD_Operations.js:14 ~ constneo4jCRUD_Operations= ~ e:',
      e
    );
  } finally {
    driver.close();
  }
};

neo4jCRUD_Operations();
