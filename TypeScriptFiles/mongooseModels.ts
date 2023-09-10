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
  PostsModel_create_ops: async (funcArguments: argumentType) => {
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
  PostsModel_read_ops: async (funcArguments: argumentType) => {
    const { refModel, modelName, collectionName } = funcArguments;
    const existingModel = mongoose.models[modelName];

    let modelUsed = (existingModel as posts_model_type) || PostsModel;
    if (!existingModel) {
      console.log(`Model "${modelName}"  exist.`);
    } else {
      console.log(`Model "${modelName}" does not exist.`);
    }
   const populate_case =  await modelUsed.find({ title: 'My First Post' }).populate(
      'author'
    );
    console.log("🚀 ~ file: mongooseModels.ts:50 ~ PostsModel_read_ops: ~ populate_case:", populate_case)
    
    return true;
  },
  UserModel_create_ops: async (funcArguments: argumentType) => {
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
  PersonModel_create_ops: async (funcArguments: argumentType) => {
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
  PersonModel_update_ops: async (funcArguments: argumentType) => {
    const { modelName } = funcArguments;
    const existingModel = mongoose.models[modelName];

    let modelUsed = (existingModel as person_model_type) || PersonModel;
    if (!existingModel) {
      console.log(`Model "${modelName}"  exist.`);
    } else {
      console.log(`Model "${modelName}" does not exist.`);
    }
    // the second argument or object passed is the payload to be updated, setting upsert as true will create a new document if its not found
    // when you use the findOneAndUpdate method with runValidators: true, it will run validators defined in your schema, but it won't check for the presence of required fields that aren't part of the update. In your case, the name field is marked as required in your schema, but you didn't include it in your update operation. This behavior is by design because Mongoose assumes that when you are using findOneAndUpdate, you may only want to update specific fields and not necessarily the entire document.
    // used to find a single document that matches a given filter/query, update it, and return the original document by default (before the update). It is useful when you want to find a document, modify it, and possibly return its previous state.
  const find_and_update =  await modelUsed.findOneAndUpdate(
      { name: 'adult' },
      { age: '54' },
      { new: true, upsert: true, runValidators: true }
    );
    console.log("🚀 ~ file: mongooseModels.ts:113 ~ PersonModel_update_ops: ~ find_and_update:", find_and_update)
    // updates all the records which satisfy the conditions
   const update_many =  await modelUsed.updateMany(
      { age: { $gt: 25 } },
      { name: 'adult' },
      { new: true, runValidators: true }
    );
    console.log("🚀 ~ file: mongooseModels.ts:120 ~ PersonModel_update_ops: ~ update_many:", update_many)
    // used to update a single document that matches a given filter/query. It is designed to perform the update operation without returning the updated document itself.
  const update_one =   await modelUsed.updateOne({ name: 'adult' }, { age: 30 });
  console.log("🚀 ~ file: mongooseModels.ts:123 ~ PersonModel_update_ops: ~ update_one:", update_one)

    return true;
  },
  PersonModel_read_ops: async (funcArguments: argumentType) => {
    const { modelName } = funcArguments;
    const existingModel = mongoose.models[modelName];

    let modelUsed = (existingModel as person_model_type) || PersonModel;
    if (!existingModel) {
      console.log(`Model "${modelName}"  exist.`);
    } else {
      console.log(`Model "${modelName}" does not exist.`);
    }
    const selectVariations_1 = await modelUsed
      .where('name')
      .equals('Alice')
      .limit(1)
      .populate('bestFriend');
    console.log(
      '🚀 ~ file: mongooseModels.ts:93 ~ PersonModel_read_ops: ~ selectVariations_1:',
      selectVariations_1
    );
    const findByName = await modelUsed.findByName('Alice');
    console.log(
      '🚀 ~ file: mongooseModels.ts:95 ~ PersonModel_read_ops: ~ findByName:',
      findByName
    );
    const queryHelper = await modelUsed.find().byName('Alice');
    console.log(
      '🚀 ~ file: mongooseModels.ts:97 ~ PersonModel_read_ops: ~ queryHelper:',
      queryHelper
    );
    

    return true;
  },
  myTestModel_create_ops: async (funcArguments: any) => {
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

    return true;
  },
  myTestModel_read_ops: async (funcArguments: any) => {
    const { modelName } = funcArguments;

    const existingModel = mongoose.models[modelName];
    let modelUsed = (existingModel as test_model_type) || myTestModel;
    if (!existingModel) {
      console.log(`Model "${modelName}"  exist.`);
    } else {
      console.log(`Model "${modelName}" does not exist.`);
    }

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
    const selectVariations_1 = await modelUsed
      .find({ name: 'John Doe' })
      .select('-name -updatedAt -hobbies -address -age');
    console.log(
      '🚀 ~ file: mongooseModels.ts:180 ~ myTestModel_read_ops: ~ selectVariations_1:',
      selectVariations_1
    );
    const selectVariations_2 = await modelUsed
      .where('name')
      .equals('JOHN DOE')
      .where('age')
      .gte(40)
      .limit(1)
      .select('createdAt updatedAt');
    console.log(
      '🚀 ~ file: mongooseModels.ts:188 ~ myTestModel_read_ops: ~ selectVariations_2:',
      selectVariations_2
    );
    return true;
  },
};
