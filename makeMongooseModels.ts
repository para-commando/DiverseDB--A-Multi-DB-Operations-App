import { Schema, Document, Model, model } from 'mongoose';

interface ModelArguments<T extends Document> {
  modelName: string;
  schema: Schema<T>;
  collectionName: string;
}

export const getMongooseModels = <T extends Document>({
  modelName,
  schema,
  collectionName,
}: ModelArguments<T>): Model<T> => {
  return model<T>(modelName, schema, collectionName);
};
