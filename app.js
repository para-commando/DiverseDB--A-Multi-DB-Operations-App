const { dataObjects } = require('./DatabaseSampleDataObjects');
require('dotenv').config();
const { getMongoDataBaseConnection } = require('./connectionUtils');
const { getMongooseModels } = require('./mongooseModels');
const { getMongooseSchemaObjects } = require('./mongooseSchemas');
const validator = require('validator');
async function mongoDbOperations() {
  const connection = await getMongoDataBaseConnection('MyMongoDB');

  try {
    // Define a schema and create a model

    // lets say i change unique property to true then i need to change the index in database correspondingly
    const schema = await getMongooseSchemaObjects({
      mongoDatabaseConnection: connection,
      schemaConstraints: {
        email2: {
          type: String,
          required: true,
          lowercase: true,
          unique: true,
          validate: (value) => {
            return validator.isEmail(value);
          },
        },
      },
    });
    const model = getMongooseModels({
      modelName: 'myModel22',
      schema: schema,
      databaseConnection: connection,
    });

    // Insert many documents using the model
    const insertManyResult = await model.insertMany(
      dataObjects.mongDatabaseDataObjects.emailData
    );
    console.log('Insert Many Result:', insertManyResult);
    console.log(`${insertManyResult.length} documents successfully inserted.`);
  } catch (err) {
    console.error(`Error inserting documents: ${err}`);
  }
  await connection.disconnect();

}

mongoDbOperations().catch((error) => {
  console.log('Error in mongoDbOperations:', error);
});
