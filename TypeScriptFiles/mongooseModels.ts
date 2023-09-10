import { getMongooseModels } from './makeMongooseModels';
import { getMongooseSchemaObjects } from './mongooseSchemas';
import mongoose, { Connection, Schema, Document, Query, Model } from 'mongoose';
import myTestModel, { test_model_type } from './models/myTestModel';
import PersonModel, { person_model_type } from './models/PersonModel';
import UserModel, { user_model_type } from './models/UserModel';
import PostsModel, { posts_model_type } from './models/PostsModel';

interface argumentType {
  readonly refModel?: {
    userModel?: string;
    PersonModel?: string;
  };
  readonly connection: Connection;
  readonly modelName: string;
  readonly collectionName: string;
}
export const mongooseModels = {
  PostsModel_ops: async (funcArguments: argumentType) => {
    const { refModel, modelName, collectionName } = funcArguments;
    const existingModel = mongoose.models[modelName];

    let modelUsed = (existingModel as posts_model_type) || PostsModel;
    if (!existingModel) {
      console.log(`Model "${modelName}"  exist.`);
    } else {
      console.log(`Model "${modelName}" does not exist.`);
    }
    const newPost = new modelUsed({
      title: 'My First Post',
      content: 'This is the content of my post.',
      author: '64f48d4b659e8073cc909274', // Assign the user's _id to the author field
    });
    await newPost.save();
     return true;
  },

  UserModel_ops: async (funcArguments: argumentType) => {
    const { modelName, collectionName } = funcArguments;
    const existingModel = mongoose.models[modelName];

    let modelUsed = (existingModel as user_model_type) || UserModel;
    if (!existingModel) {
      console.log(`Model "${modelName}"  exist.`);
    } else {
      console.log(`Model "${modelName}" does not exist.`);
    }
    const newUser = new modelUsed({
      username: 'john_doe',
      email: 'john@example.com',
    });

    await newUser.updateEmail('new.email@example.com');

    // Save the user document
    await newUser.save();
    return true;
  },
  PersonModel_ops: async (funcArguments: argumentType) => {
    const { modelName } = funcArguments;
    const existingModel = mongoose.models[modelName];

    let modelUsed = (existingModel as person_model_type) || PersonModel;
    if (!existingModel) {
      console.log(`Model "${modelName}"  exist.`);
    } else {
      console.log(`Model "${modelName}" does not exist.`);
    }
    const alice = new modelUsed({ name: 'Alice', age: 28 });
    const bob = new modelUsed({ name: 'Bob', age: 30 });

    // Assume alice is best friends with bob
    alice.bestFriend = bob._id; // _id is the ObjectId of the bob document
    await alice.save();
    await bob.save();

    return true;
  },
  myTestModel_ops: async (funcArguments: any) => {
    const { modelName } = funcArguments;

    const existingModel = mongoose.models[modelName];
    let modelUsed = (existingModel as test_model_type) || myTestModel;
    if (!existingModel) {
      console.log(`Model "${modelName}"  exist.`);
    } else {
      console.log(`Model "${modelName}" does not exist.`);
    }
    const insertManyResult = await modelUsed.create({
      name: 'JOHN DOE',
      age: 28,
      email: 'john@example.com',
    });
    console.log(
      '🚀 ~ file: mongooseModels.ts:304 ~ myTestModel_ops: ~ insertManyResult:',
      insertManyResult
    );

    const aggregateFunctionValue = await modelUsed.aggregate([
      // Match names by a a value that is get all documents whose name match the below value then pass it as input to the next operation under this .aggregate method that is to $group
      { $match: { name: 'JOHN DOE' } },

      // Group persons who have name as above value by their unique email as their group name then compute their average age value of each group
      {
        $group: {
          _id: '$email',
          averageAge: { $avg: '$age' },
        },
      },
    ]);
    console.log(
      '🚀 ~ file: mongooseModels.ts:318 ~ myTestModel_ops: ~ aggregateFunctionValue:',
      aggregateFunctionValue
    );

    const deletes = await modelUsed.findOneAndDelete({ name: 'JOHN DOE' });
    console.log(
      '🚀 ~ file: mongooseModels.ts:246 ~ myTestModel: ~ deletes:',
      deletes
    );
    const findOnes = await modelUsed.findOne({ name: 'John Doe' });
    console.log(
      '🚀 ~ file: mongooseModels.ts:248 ~ myTestModel: ~ findOne:',
      findOnes
    );
    const findByIds = await modelUsed.findById({
      _id: '64ef82e540539ad992194b3f',
    });
    console.log(
      '🚀 ~ file: mongooseModels.ts:250 ~ myTestModel: ~ findById:',
      findByIds
    );
    const exists = await modelUsed.exists({ age: 22 });
    console.log(
      '🚀 ~ file: mongooseModels.ts:252 ~ myTestModel: ~ exists:',
      exists
    );
    const testingVirtualProperty = await modelUsed.findOne({
      name: 'john doe',
    });

    const age_value: { type: Number; min: 1 } | undefined =
      testingVirtualProperty?.age;
    if (typeof age_value == 'number') {
      const virtual_output = testingVirtualProperty?.isAgeWithinLimit(
        age_value,
        10
      );
      console.log(
        '🚀 ~ file: mongooseModels.ts:66 ~ myTestModel: ~ virtual_output:',
        virtual_output
      );
    }
    console.log(
      '🚀 ~ file: MongoDbOperations.js:131 ~ module.exports.mongoDbReadOperations= ~ testingVirtualProperty.greetUser: ',
      testingVirtualProperty?.greetUser
    );

    const statics_output = await modelUsed.findByName('john doe');
    console.log(
      '🚀 ~ file: mongooseModels.ts:75 ~ myTestModel: ~ statics_output:',
      statics_output
    );
    return true;
  },
};
