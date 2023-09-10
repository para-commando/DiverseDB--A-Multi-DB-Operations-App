require('dotenv').config();
import { mongooseModels } from './mongooseModels';
import { dataObjects } from './DatabaseSampleDataObjects';
import { Connection, FilterQuery } from 'mongoose';

export const mongoDbCreateOperations = async (connection: Connection) => {
  try {
    // Define a schema and create a model
    await mongooseModels.myTestModel_create_ops({
      connection: connection,
      modelName: 'myTestModel',
      refModel: {},
      collectionName: 'myTestCollection',
    });

    await mongooseModels.PersonModel_create_ops({
      connection: connection,
      modelName: 'PersonModel',
      refModel: { PersonModel: 'PersonModel' },
      collectionName: 'PersonCollection',
    });

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
    return true;
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
      modelName: 'myTestModel',
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
    return true;
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

export const mongoDbDeleteOperations = async (connection: Connection) => {
  try {
    await mongooseModels.myTestModel_delete_ops({
      connection: connection,
      modelName: 'myTestModel',
      refModel: {},
      collectionName: 'myTestCollection',
    });
    await mongooseModels.PersonModel_delete_ops({
      connection: connection,
      modelName: 'PersonModel',
      refModel: { PersonModel: 'PersonModel' },
      collectionName: 'PersonCollection',
    });
    await mongooseModels.PostsModel_delete_ops({
      connection: connection,
      modelName: 'PostsModel',
      refModel: { userModel: 'UserModel' },
      collectionName: 'PostsCollection',
    });
  } catch (err) {
    console.error(`Error deleting documents: ${err}`);
    throw err;
  }
};
