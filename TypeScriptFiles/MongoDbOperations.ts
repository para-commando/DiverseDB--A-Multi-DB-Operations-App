require('dotenv').config();
import { mongooseModels } from './mongooseModels';
import { dataObjects } from './DatabaseSampleDataObjects';
import { Connection, FilterQuery } from 'mongoose';

export const mongoDbCreateOperations = async (connection: Connection) => {
  try {
    // Define a schema and create a model
    await mongooseModels.myTestModel_ops({
      connection: connection,
      modelName: 'myTestModel_ops',
      refModel: {},
      collectionName: 'myTestCollection',
    });

    // ************************ UseCase-2 *******************************

    // Create the Person model
    await mongooseModels.PersonModel_ops({
      connection: connection,
      modelName: 'PersonModel',
      refModel: { PersonModel: 'PersonModel' },
      collectionName: 'PersonCollection',
    });

    // ************************ UseCase-3 *******************************
    await mongooseModels.UserModel_ops({
      connection: connection,
      modelName: 'UserModel',
      collectionName: 'UserCollection',
    });

    await mongooseModels.PostsModel_ops({
      connection: connection,
      modelName: 'PostsModel',
      refModel: { userModel: 'UserModel' },
      collectionName: 'PostsCollection',
    });
  } catch (err) {
    console.error(`Error inserting documents: ${err}`);
    throw err;
  }
};

// export const mongoDbReadOperations = async (connection: Connection) => {
//   try {
//     // if used any other Read methods apart from these like findOneAndUpdate then during the updation part schema validation will be bypassed in order to solve that issue we need to use the option   { runValidators: true }, while using that
//     const myTestModel_ops = await mongooseModels.myTestModel_ops({
//       connection: connection,
//       modelName: 'myTestModel_ops',
//       refModel: {},
//       collectionName: 'myTestCollection',
//     });
//     const PostsModel = await mongooseModels.PostsModel({
//       connection: connection,
//       modelName: 'PostsModel',
//       refModel: { userModel: 'UserModel' },
//       collectionName: 'PostsCollection',
//     });
//     const PersonModel = await mongooseModels.PersonModel({
//       connection: connection,
//       modelName: 'PersonModel',
//       refModel: { PersonModel: 'PersonModel' },
//       collectionName: 'PersonCollection',
//     });
//     const testingVirtualProperty = await myTestModel_ops.findOne({
//       name: 'John Doe',
//     });
//     console.log(
//       '🚀 ~ file: MongoDbOperations.js:131 ~ module.exports.mongoDbReadOperations= ~ testingVirtualProperty.greetUser: ',
//       testingVirtualProperty.greetUser
//     );

//     const readOperationVariations = {
//       find: await myTestModel_ops
//         .find({ name: 'John Doe' })
//         .select('-name -updatedAt -hobbies -address -age'),
//       findOne: await myTestModel_ops.findOne({ name: 'John Doe' }),
//       findById: await myTestModel_ops.findById({
//         _id: '64ef82e540539ad992194b3f',
//       }),
//       exists: await myTestModel_ops.exists({ age: 22 }),
//       clauses: {
//         case1: await myTestModel_ops
//           .where('name')
//           .equals('JOHN DOE')
//           .where('age')
//           .gte(40)
//           .limit(1)
//           .select('createdAt updatedAt'),
//         case2: await PersonModel.where('name')
//           .equals('Alice')
//           .limit(1)
//           .populate('bestFriend'),
//         case3: await PersonModel.findByName('Alice'),
//         case4: await PersonModel.find().byName('Alice'),
//       },
//       populate: await PostsModel.find({ title: 'My First Post' }).populate(
//         'author'
//       ),
//     };
//     console.log(
//       '🚀 ~ file: MongoDbOperations.js:84 ~ module.exports.mongoDbReadOperations= ~ readOperationVariations:',
//       readOperationVariations
//     );
//   } catch (err) {
//     console.error(`Error Finding documents: ${err}`);
//     throw err;
//   }
// };

// export const mongoDbUpdateOperations = async (connection: Connection) => {
//   try {
//     const PersonModel = await mongooseModels.PersonModel({
//       connection: connection,
//       modelName: 'PersonModel',
//       refModel: { PersonModel: 'PersonModel' },
//       collectionName: 'PersonCollection',
//     });
//     // the second argument or object passed is the payload to be updated, setting upsert as true will create a new document if its not found
//     // when you use the findOneAndUpdate method with runValidators: true, it will run validators defined in your schema, but it won't check for the presence of required fields that aren't part of the update. In your case, the name field is marked as required in your schema, but you didn't include it in your update operation. This behavior is by design because Mongoose assumes that when you are using findOneAndUpdate, you may only want to update specific fields and not necessarily the entire document.
//     // used to find a single document that matches a given filter/query, update it, and return the original document by default (before the update). It is useful when you want to find a document, modify it, and possibly return its previous state.
//     await PersonModel.findOneAndUpdate(
//       { name: 'adult' },
//       { age: '54' },
//       { new: true, upsert: true, runValidators: true }
//     );
//     // updates all the records which satisfy the conditions
//     await PersonModel.updateMany(
//       { age: { $gt: 25 } },
//       { name: 'adult' },
//       { new: true, runValidators: true }
//     );
//     // used to update a single document that matches a given filter/query. It is designed to perform the update operation without returning the updated document itself.
//     await PersonModel.updateOne({ name: 'adult' }, { age: 30 });
//   } catch (err) {
//     console.error(`Error updating documents: ${err}`);
//     throw err;
//   }
// };

// export const mongoDbDeleteOperations = async (connection: Connection) => {
//   try {
//     const myTestModel_ops = await mongooseModels.myTestModel_ops({
//       connection: connection,
//       modelName: 'myTestModel_ops',
//       refModel: {},
//       collectionName: 'myTestCollection',
//     });
//     const PersonModel = await mongooseModels.PersonModel({
//       connection: connection,
//       modelName: 'PersonModel',
//       refModel: { PersonModel: 'PersonModel' },
//       collectionName: 'PersonCollection',
//     });
//     const PostsModel = await mongooseModels.PostsModel({
//       connection: connection,
//       modelName: 'PostsModel',
//       refModel: { userModel: 'UserModel' },
//       collectionName: 'PostsCollection',
//     });
//     await PersonModel.deleteOne({ _id: '64f4474c4bf70034aff3793c' });

//     // can use in operator here like { _id: { $in: idsToDelete } } to delete an array of documents whose IDs are given in the array 'idsToDelete'
//     await myTestModel_ops.deleteMany({ email: 'john@example.com' });

//     await myTestModel_ops.findOneAndDelete({ name: 'JOHN DOE' });

//     // Can delete only one document at a time
//     await PostsModel.findByIdAndDelete('64f4474c4bf70034aff37942');
//   } catch (err) {
//     console.error(`Error deleting documents: ${err}`);
//     throw err;
//   }
// };
