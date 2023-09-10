require('dotenv').config();
import { mongooseModels } from './mongooseModels';
import { dataObjects } from './DatabaseSampleDataObjects';
import { Connection, FilterQuery } from 'mongoose';

export const mongoDbCreateOperations = async (connection: Connection) => {
  try {
    // Define a schema and create a model
    await mongooseModels.myTestModel_create_ops({
      connection: connection,
      modelName: 'myTestModel_ops',
      refModel: {},
      collectionName: 'myTestCollection',
    });

    // ************************ UseCase-2 *******************************

    // Create the Person model
    await mongooseModels.PersonModel_create_ops({
      connection: connection,
      modelName: 'PersonModel',
      refModel: { PersonModel: 'PersonModel' },
      collectionName: 'PersonCollection',
    });

    // ************************ UseCase-3 *******************************
    await mongooseModels.UserModel_create_ops({
      connection: connection,
      modelName: 'UserModel',
      collectionName: 'UserCollection',
    });

    await mongooseModels.PostsModel_create_ops({
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

export const mongoDbReadOperations = async (connection: Connection) => {
  try {
    // if used any other Read methods apart from these like findOneAndUpdate then during the updation part schema validation will be bypassed in order to solve that issue we need to use the option   { runValidators: true }, while using that
    await mongooseModels.myTestModel_read_ops({
      connection: connection,
      modelName: 'myTestModel_ops',
      refModel: {},
      collectionName: 'myTestCollection',
    });
    await mongooseModels.PostsModel_read_ops({
      connection: connection,
      modelName: 'PostsModel',
      refModel: { userModel: 'UserModel' },
      collectionName: 'PostsCollection',
    });
    await mongooseModels.PersonModel_read_ops({
      connection: connection,
      modelName: 'PersonModel',
      refModel: { PersonModel: 'PersonModel' },
      collectionName: 'PersonCollection',
    });
  } catch (err) {
    console.error(`Error Finding documents: ${err}`);
    throw err;
  }
};

export const mongoDbUpdateOperations = async (connection: Connection) => {
  try {
    await mongooseModels.PersonModel_update_ops({
      connection: connection,
      modelName: 'PersonModel',
      refModel: { PersonModel: 'PersonModel' },
      collectionName: 'PersonCollection',
    });
    return true;
  } catch (err) {
    console.error(`Error updating documents: ${err}`);
    throw err;
  }
};

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
