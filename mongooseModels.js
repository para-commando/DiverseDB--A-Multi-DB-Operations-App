const { getMongooseModels } = require('./makeMongooseModels');
const { getMongooseSchemaObjects } = require('./mongooseSchemas');
const validator = require('validator');
const mongoose = require('mongoose');
module.exports.mongooseModels = {
  PostsModel: async (arguments) => {
    const modelName = 'Posts'; // Replace with your model name
    const existingModel = mongoose.models[modelName];

    if (existingModel) {
      console.log(`Model "${modelName}" already exists.`);
      return existingModel;
    } else {
      console.log(`Model "${modelName}" does not exist.`);
      const postsConstraints = {
        title: String,
        content: String,
        author: {
          type: arguments.connection.Schema.Types.ObjectId,
          ref: 'User', // Reference to the 'User' model
        },
      };
      const postsSchema = await getMongooseSchemaObjects({
        mongoDatabaseConnection: arguments.connection,
        schemaConstraints: postsConstraints,
      });
      const PostsModel = getMongooseModels({
        modelName: 'Posts',
        schema: postsSchema,
        databaseConnection: arguments.connection,
      });
      return PostsModel;
    }
  },
  UserModel: async (arguments) => {
    const modelName = 'User'; // Replace with your model name
    const existingModel = mongoose.models[modelName];

    if (existingModel) {
      console.log(`Model "${modelName}" already exists.`);
      return existingModel;
    } else {
      console.log(`Model "${modelName}" does not exist.`);
      const userSchemaConstraints = {
        username: String,
        email: String,
      };
      const userSchema = await getMongooseSchemaObjects({
        mongoDatabaseConnection: arguments.connection,
        schemaConstraints: userSchemaConstraints,
      });
      const UserModel = getMongooseModels({
        modelName: 'Person',
        schema: userSchema,
        databaseConnection: arguments.connection,
      });
      return UserModel;
    }
  },
  PersonModel: async (arguments) => {
    const modelName = 'Person'; // Replace with your model name
    const existingModel = mongoose.models[modelName];

    if (existingModel) {
      console.log(`Model "${modelName}" already exists.`);
      return existingModel;
    } else {
      console.log(`Model "${modelName}" does not exist.`);
      const personSchemaConstraints = {
        name: String,
        age: Number,
        bestFriend: {
          type: arguments.connection.SchemaTypes.ObjectId,
          ref: 'Person',
        }, // Reference to another Person document
      };
      const personSchema = await getMongooseSchemaObjects({
        mongoDatabaseConnection: arguments.connection,
        schemaConstraints: personSchemaConstraints,
      });
      // Create the Person model
      const PersonModel = getMongooseModels({
        modelName: 'Person',
        schema: personSchema,
        databaseConnection: arguments.connection,
      });
      return PersonModel;
    }
  },
  myTestModel: async (arguments) => {
    const modelName = 'myTestModel'; // Replace with your model name
    const existingModel = mongoose.models[modelName];

    if (existingModel) {
      console.log(`Model "${modelName}" already exists.`);
      return existingModel;
    } else {
      console.log(`Model "${modelName}" does not exist.`);

      const subSchemaConstraints = {
        street: String,
        city: String,
      };

      const subSchema = await getMongooseSchemaObjects({
        mongoDatabaseConnection: arguments.connection,
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
          maxLength: 40,
        },
        age: {
          type: Number,
          min: 1,
          validate: {
            validator: (age) => age <= 150,
            message: (props) =>
              `${props.path} input(${props.value}) is  greater than 150`,
          },
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
        bestFriend: arguments.connection.SchemaTypes.ObjectId,
        hobbies: [String],
        address: subSchema,
      };
      const mainSchema = await getMongooseSchemaObjects({
        mongoDatabaseConnection: arguments.connection,
        schemaConstraints: schemaConstraints,
      });
      const model = getMongooseModels({
        modelName: 'myTestModel',
        schema: mainSchema,
        databaseConnection: arguments.connection,
      });
      // making schema changes dynamic
      await model.schema.index(
        { address_1: 1 },
        { unique: schemaConstraints.name.unique }
      );
      // Ensure the indexes are applied
      await model.ensureIndexes();
      return model;
    }
  },
};
