const { getMongoDataBaseConnection } = require('./connectionUtils');
const {
  mongoDbCreateOperations,
  mongoDbReadOperations,
  mongoDbUpdateOperations,
  mongoDbDeleteOperations,
} = require('./MongoDbOperations');
module.exports.mongoDatabaseCRUD_Ops = async () => {
  const connection = await getMongoDataBaseConnection('MyMongoDB');

  try {
    await mongoDbCreateOperations(connection);
    await mongoDbReadOperations(connection);
    await mongoDbUpdateOperations(connection);
    await mongoDbDeleteOperations(connection);
  } catch (err) {
    console.log('🚀 ~ file: app.js:81 ~ err:', err);
    throw err;
  } finally {
    await connection.disconnect();
  }
};
