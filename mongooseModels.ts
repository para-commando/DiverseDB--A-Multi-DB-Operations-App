const { getMongooseModels } = require('./makeMongooseModels');
import { getMongooseSchemaObjects } from './mongooseSchemas';
const validator = require('validator');
import mongoose, { Connection, Document } from 'mongoose';

interface argumentType {
  refModel: { userModel: string },
  connection: Connection,
  modelName: string,
  collectionName: string
}
module.exports.mongooseModels = {
  PostsModel: async (funcArguments: argumentType) => {
    const { refModel, modelName, collectionName, connection } = funcArguments;
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
          type: mongoose.Schema.Types.ObjectId,
          ref: refModel.userModel, // Reference to the 'User' model
        },
      };
      type postsConstraints_type = Document & typeof postsConstraints;


      const postsSchema = getMongooseSchemaObjects<postsConstraints_type>({
        schemaConstraints: postsConstraints,
      });

      const PostsModel = getMongooseModels({
        modelName: modelName,
        schema: postsSchema,
        databaseConnection: connection,
        collectionName: collectionName,
      });
      PostsModel.pre('save', function () {
        console.log(
          `🚀🚀🚀🚀 Alert, Save action triggered for collection:  ${collectionName} using model: ${modelName}`
        );

        return true;
      });
      PostsModel.post('save', async function () {
        console.log(
          `🚀🚀🚀🚀 Data, Successfully saved in collection: ${collectionName} using model: ${modelName}`
        );

        return true;
      });
      return PostsModel;
    }
  },
  UserModel: async (arguments) => {
    const modelName = arguments.modelName; // Replace with your model name
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
      // adding instance methods which are called on each documents instances
      userSchema.methods.updateEmail = function (newEmail) {
        this.email = newEmail;
        return this.save();
      };
      userSchema.methods.sayHi = function () {
        console.log(
          '🚀 ~ file: mongooseModels.js:76 ~ UserModel: user greeting message: ',
          'Heyyyy ' + this.username
        );
        return;
      };
      const coll = arguments.collectionName;
      userSchema.pre('save', function () {
        console.log(
          `🚀🚀🚀🚀 Alert, Save action triggered for collection:  ${coll} using model: ${modelName}`
        );
        if (!validator.isEmail(this.email)) {
          throw new Error('Invalid Email');
        }
        this.sayHi();
        return true;
      });

      const UserModel = getMongooseModels({
        modelName: modelName,
        schema: userSchema,
        databaseConnection: arguments.connection,
        collectionName: arguments.collectionName,
      });
      return UserModel;
    }
  },
  PersonModel: async (arguments) => {
    const modelName = arguments.modelName; // Replace with your model name
    const existingModel = mongoose.models[modelName];

    if (existingModel) {
      console.log(`Model "${modelName}" already exists.`);
      return existingModel;
    } else {
      console.log(`Model "${modelName}" does not exist.`);
      const personSchemaConstraints = {
        name: { type: String, required: true },
        age: {
          type: Number,
          validate: {
            validator: (age) => age <= 150,
            message: (props) =>
              `${props.path} input(${props.value}) is  greater than 150`,
          },
        },
        bestFriend: {
          type: arguments.connection.SchemaTypes.ObjectId,
          ref: arguments.refModel.PersonModel,
        }, // Reference to another Person document
      };
      const personSchema = await getMongooseSchemaObjects({
        mongoDatabaseConnection: arguments.connection,
        schemaConstraints: personSchemaConstraints,
      });
      // static custom methods which can use over all the instances of the concerned model
      personSchema.statics.findByName = function (username) {
        return this.findOne({ name: username });
      };

      // query methods are the ones which can only be used post one query operation that is needs a query object for its performance which is normally used to create a custom query to chain with existing ones which are unlike static methods which can be called directly over a model
      // also it would be better to use it over a .find() query object as the below implementation corresponds to it as well also i read that the query object which one gets upon which we apply below implementation is bit specific to the type of query object we call. For example .find() returns a query object which can be used for find operations
      personSchema.query.byName = function (name) {
        return this.where({ name: name });
      };
      personSchema.query.sortByField = function (field) {
        return this.sort({ [field]: 'asc' });
      };
      personSchema.query.byDateRange = function (lowerAgeLimit, upperAgeLimit) {
        return this.where('age').gte(lowerAgeLimit).lte(upperAgeLimit);
      };
      // Instance methods: unlike query and static methods this methods are applied on each documents of the respective model/collection
      // these are different from .virtual as these are parameterized and virtuals are not
      personSchema.methods.isAgeWithinLimit = function (age, limit) {
        return age <= limit;
      };
      personSchema.methods.updateTitle = function (newTitle) {
        this.title = newTitle;
        return this.save();
      };
      personSchema.methods.validateData = function (data) {
        // validate the data using required mechanism and return true if it passes else false
        if (typeof data === 'string') return true;
        else return false;
      };
      // Create the Person model
      const PersonModel = getMongooseModels({
        modelName: modelName,
        schema: personSchema,
        databaseConnection: arguments.connection,
        collectionName: arguments.collectionName,
      });

      return PersonModel;
    }
  },
  myTestModel: async (arguments) => {
    const modelName = arguments.modelName; // Replace with your model name
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
      mainSchema.virtual('greetUser').get(function () {
        // Calculate the discounted price
        return 'Hello,' + this.name;
      });
      const model = getMongooseModels({
        modelName: modelName,
        schema: mainSchema,
        databaseConnection: arguments.connection,
        collectionName: arguments.collectionName,
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
