import { Schema, Document, Model, model } from 'mongoose';

interface ModelArguments<T extends Document> {
  modelName: string;
  schema: Schema<T>;
  collectionName: string;
}

export const getMongooseModels = <T extends Document, I_METHODS>({
  modelName,
  schema,
  collectionName,
}: ModelArguments<T>): Model<T> => {
  type UserModel = Model<T, {}, I_METHODS>;

  return model<T, UserModel>(modelName, schema, collectionName);
};
