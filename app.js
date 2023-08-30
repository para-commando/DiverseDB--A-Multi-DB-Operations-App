const { dataObjects } = require('./DatabaseSampleDataObjects');
require('dotenv').config();
const { getMongoDataBaseConnection } = require('./connectionUtils');
const { getMongooseModels } = require('./mongooseModels');
const { getMongooseSchemaObjects } = require('./mongooseSchemas');
const validator = require('validator');
const connection = await getMongoDataBaseConnection('MyMongoDB');

async function mongoDbCreateOperations(connection) {

  try {
    // Define a schema and create a model

    const schemaConstraints = {
      email2: {
        type: String,
        required: true,
        lowercase: true,
        unique: false,
        validate: (value) => {
          return validator.isEmail(value);
        },
      },
      email3: {
        type: String,
      },
    };
    const schema = await getMongooseSchemaObjects({
      mongoDatabaseConnection: connection,
      schemaConstraints: schemaConstraints,
    });
    const model = getMongooseModels({
      modelName: 'myModel22',
      schema: schema,
      databaseConnection: connection,
    });
    // making schema changes dynamic
    await model.schema.index(
      { email2_1: 1 },
      { unique: schemaConstraints.email2.unique }
    );
    // Ensure the indexes are applied
    await model.ensureIndexes();

    // Insert many documents using .create() method

    const data = [
      { email2: 'aba23423cd@gmail.com' },
      { email2: 'abac34234d@gmail.com' },
      { email2: 'abac23234d@gmail.com' },
    ];
    const insertManyResult = await model.create(data);
    console.log(
      '🚀 Total documents inserted using .create method:  ',
      insertManyResult.length
    );

    // Insert many documents using the instance method

    const instances = data.map((item) => new model(item));

    const promises = instances.map((instance) => instance.save());

    const insertingMultipleDocuments = await Promise.all(promises);
    console.log(
      '🚀 Total documents inserted using instance method:  ',
      insertingMultipleDocuments.length
    );
  } catch (err) {
    console.error(`Error inserting documents: ${err}`);
  }
  await connection.disconnect();
}

mongoDbCreateOperations(connection).catch((error) => {
  console.log('Error in mongoDbCreateOperations:', error);
});
