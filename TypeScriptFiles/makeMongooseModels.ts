import { Schema, Document, Model, model, Query } from 'mongoose';

interface ModelArguments<T extends Document, I_METHODS, I_QUERY_METHODS extends Query<T | null, T>, model_type extends Model<T, I_QUERY_METHODS, I_METHODS>> {
  modelName: string;
  schema: Schema<T, model_type, I_METHODS, I_QUERY_METHODS>;
  collectionName: string;
}
// https://mongoosejs.com/docs/typescript/statics-and-methods.html
export const getMongooseModels = <T extends Document, I_METHODS, I_QUERY_METHODS extends Query<T | null, T>, model_type extends Model<T, I_QUERY_METHODS, I_METHODS>>({
  modelName,
  schema,
  collectionName,
}: ModelArguments<T, I_METHODS, I_QUERY_METHODS, model_type>): Model<T, I_QUERY_METHODS, I_METHODS> => {
  // type UserModel = Model<T, {}, I_METHODS>;

  return model<T, model_type>(modelName, schema, collectionName);
};
