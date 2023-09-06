import { Schema, Document, Model, model } from 'mongoose';

interface ModelArguments<T extends Document> {
  modelName: string;
  schema: Schema<T>;
  collectionName: string;
}
// https://mongoosejs.com/docs/typescript/statics-and-methods.html
export const getMongooseModels = <T extends Document, model_type>({
  modelName,
  schema,
  collectionName,
}: ModelArguments<T>): Model<T> => {
  // type UserModel = Model<T, {}, I_METHODS>;

  return model<T, model_type>(modelName, schema, collectionName);
};
