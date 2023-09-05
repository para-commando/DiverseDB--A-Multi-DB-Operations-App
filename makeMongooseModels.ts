import mongoose, { Connection } from 'mongoose';

interface modelArguments {
  modelName: string,
  schema: ,
  databaseConnection: Connection,
  collectionName: string,
}
export const getMongooseModels = ({
  modelName,
  schema,
  databaseConnection,
  collectionName,
}: modelArguments) => {
  return databaseConnection.model(modelName, schema, collectionName);
};
