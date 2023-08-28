const { dataObjects } = require('./DatabaseSampleDataObjects');
require('dotenv').config();
const { mongoDatabaseClient } = require('./mongoClientConnect');
async function mongoDbOperations() {
  const mongoDbClient = await mongoDatabaseClient('MyMongoDB');

  try {
    const collectionName = mongoDbClient.collection('MyCollection21');

    const insertManyResult = await collectionName.insertMany(
      dataObjects.mongDatabaseDataObjects.sampleInsertData
    );
    console.log(
      '🚀 ~ file: app.js:98 ~ run ~ insertManyResult:',
      insertManyResult
    );
    console.log(
      `${insertManyResult.insertedCount} documents successfully inserted.\n`
    );
  } catch (err) {
    console.error(
      `Something went wrong trying to insert the new documents: ${err}\n`
    );
  }
  await mongoDbClient.close();
  console.log('MongoDB 🌿 Connection closed ⚓⚓......');
}
mongoDbOperations().catch((error) => {
  console.log('🚀 ~ file: app.js:98 ~ run ~ error:', error);
});
