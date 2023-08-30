require('dotenv').config();
const { getMongoDataBaseConnection } = require('./connectionUtils');
const { getMongooseModels } = require('./mongooseModels');
const { getMongooseSchemaObjects } = require('./mongooseSchemas');
const validator = require('validator');
const mongoose = require('mongoose');
async function mongoDbCreateOperations(connection) {
  try {
    // Define a schema and create a model
    const subSchemaConstraints = {
      street: String,
      city: String,
    };

    const subSchema = await getMongooseSchemaObjects({
      mongoDatabaseConnection: connection,
      schemaConstraints: subSchemaConstraints,
    });
    // the uppercase:true converts string to uppercase
    //  default: () => new Date() When you use an arrow function, it will be executed each time a new document is inserted. This ensures that the default value for the createdAt field will be the date and time when the document is inserted into the database.
    // beware: note that these validations only work with create/save methods for inserting documents. It is preferred to use findById and .save on it or findOne and .save on it to prevent bypassing of below schema validation
    const schemaConstraints = {
      name: {
        type: String,
        required: true,
        uppercase: true,
        unique: false,
        minlength: 3,
        maxLength: 40
      },
      age: {
        type: Number,
        min:1,
        validate:{
          validator: age=> age <= 150,
          message: props => `${props.path} input(${props.value}) is  greater than 150`
        }
      },
      email: {
        type: String,
        validate: (value) => {
          return validator.isEmail(value);
        },
      },
      createdAt: {
        type: Date,
        immutable: true,
        default: () => new Date(),
      },
      updatedAt: {
        type: Date,
        immutable: true,
        default: () => new Date(),
      },
      bestFriend: connection.SchemaTypes.ObjectId,
      hobbies: [String],
      address: subSchema,
    };
    const mainSchema = await getMongooseSchemaObjects({
      mongoDatabaseConnection: connection,
      schemaConstraints: schemaConstraints,
    });
    const model = getMongooseModels({
      modelName: 'myTestModel',
      schema: mainSchema,
      databaseConnection: connection,
    });
    // making schema changes dynamic
    await model.schema.index(
      { address_1: 1 },
      { unique: schemaConstraints.name.unique }
    );
    // Ensure the indexes are applied
    await model.ensureIndexes();

    // Insert many documents using .create() method

    const data = [
      {
        name: 'john doe',
        age: 28,
        email: 'john@example.com',
        createdAt: new Date('2023-08-29T00:00:00Z'),
        updatedAt: new Date('2023-08-29T12:34:56Z'),
        bestFriend: new mongoose.Types.ObjectId('5f41bfc57a22a9a23d3e5d0c'), // ObjectId of another document
        hobbies: ['Reading', 'Hiking', 'Cooking'],
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          postalCode: '12345',
        },
      },
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

    // ************************ UseCase-2 *******************************

    const personSchemaConstraints = {
      name: String,
      age: Number,
      bestFriend: { type: connection.SchemaTypes.ObjectId, ref: 'Person' }, // Reference to another Person document
    };
    const personSchema = await getMongooseSchemaObjects({
      mongoDatabaseConnection: connection,
      schemaConstraints: personSchemaConstraints,
    });
    // Create the Person model
    const PersonModel = getMongooseModels({
      modelName: 'Person',
      schema: personSchema,
      databaseConnection: connection,
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
}

async function mongoDatabaseCRUD_Ops() {
  const connection = await getMongoDataBaseConnection('MyMongoDB');

  try {
    await mongoDbCreateOperations(connection);
  } catch (err) {
    console.log('🚀 ~ file: app.js:81 ~ err:', err);
    throw err;
  } finally {
    await connection.disconnect();
  }
}

mongoDatabaseCRUD_Ops();
