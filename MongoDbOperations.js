require('dotenv').config();
const { mongooseModels } = require('./mongooseModels');
const { dataObjects } = require('./DatabaseSampleDataObjects');
module.exports.mongoDbCreateOperations = async (connection) => {
  try {
    // Define a schema and create a model
    const model = await mongooseModels.myTestModel({ connection: connection });
    // Ensure the indexes are applied

    // Insert many documents using .create() method

    const insertManyResult = await model.create(
      dataObjects.mongDatabaseDataObjects.sampleInsertData
    );
    console.log(
      '🚀 Total documents inserted using .create method:  ',
      insertManyResult.length
    );

    // Insert many documents using the instance method

    const instances = dataObjects.mongDatabaseDataObjects.sampleInsertData.map(
      (item) => new model(item)
    );

    const promises = instances.map((instance) => instance.save());

    const insertingMultipleDocuments = await Promise.all(promises);
    console.log(
      '🚀 Total documents inserted using instance method:  ',
      insertingMultipleDocuments.length
    );

    // ************************ UseCase-2 *******************************

    // Create the Person model
    const PersonModel = await mongooseModels.PersonModel({
      connection: connection,
    });

    const alice = new PersonModel({ name: 'Alice', age: 28 });
    const bob = new PersonModel({ name: 'Bob', age: 30 });

    // Assume alice is best friends with bob
    alice.bestFriend = bob._id; // _id is the ObjectId of the bob document
    await alice.save();
    await bob.save();
  } catch (err) {
    console.error(`Error inserting documents: ${err}`);
    throw err;
  }
};

module.exports.mongoDbReadOperations = async (connection) => {
  try {
    // if used any other Read methods apart from these like findOneAndUpdate then during the updation part schema validation will be bypassed
    const model = await mongooseModels.myTestModel({ connection: connection });
    const readOperationVariations = {
      find: await model.find({ _id: '64ef82e540539ad992194b3f' }),
      findOne: await model.findOne({ name: 'John Doe' }),
      findById: await model.findById({ _id: '64ef82e540539ad992194b3f' }),
      exists: await model.exists({ age: 22 }),
      clauses: await model
        .where('name')
        .equals('JOHN DOE')
        .where('age')
        .gte(40)
        .limit(1).select('createdAt'),
    };
    console.log(
      '🚀 ~ file: MongoDbOperations.js:84 ~ module.exports.mongoDbReadOperations= ~ readOperationVariations:',
      readOperationVariations
    );
  } catch (err) {
    console.error(`Error Finding documents: ${err}`);
    throw err;
  }
};
