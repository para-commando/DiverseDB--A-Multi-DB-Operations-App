import { Schema, Document, Model, model } from 'mongoose';

interface ModelArguments<T extends Document, I_METHODS, model_type extends Model<T, {}, I_METHODS>> {
  modelName: string;
  schema: Schema<T, model_type, I_METHODS>;
  collectionName: string;
}
// https://mongoosejs.com/docs/typescript/statics-and-methods.html
export const getMongooseModels = <T extends Document, I_METHODS, model_type extends Model<T, {}, I_METHODS>>({
  modelName,
  schema,
  collectionName,
}: ModelArguments<T, I_METHODS, model_type>): Model<T> => {
  // type UserModel = Model<T, {}, I_METHODS>;

  return model<T, model_type>(modelName, schema, collectionName);
};
