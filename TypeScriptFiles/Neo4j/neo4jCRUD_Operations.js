const { createOps } = require('./neo4jCreateOps');
const { readOps } = require('./neo4jReadOps');
const { updateOps } = require('./neo4jUpdateOps');
const { deleteOps } = require('./neo4jDeleteOps');
const { driver } = require('./neo4jInstanceDriverConnect');

const neo4jCRUD_Operations = async () => {
  try {
    console.log("\n\n🟦🟦🟦🟦 Starting Neo4j operations 🟦🟦🟦🟦🟦\n\n")

    console.log("Starting Create Operations\n\n")
    await createOps(driver);
    console.log("\n\nCreate Operations Complete")

    console.log("\n\nStarting Update Operations")
    await updateOps(driver);
    console.log("\n\nUpdate Operations Complete")

    console.log("\n\nStarting Read Operations\n\n")
    await readOps(driver);
    console.log("\n\nRead Operations Complete")

    console.log("\n\nStarting Delete Operations\n\n")
    await deleteOps(driver);
    console.log("\n\nDelete Operations Complete")

    console.log("\n\n🟦🟦🟦🟦 Neo4j operations Complete 🟦🟦🟦🟦🟦")

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
