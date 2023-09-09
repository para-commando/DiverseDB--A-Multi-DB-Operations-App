import { Schema, Document, Model, Query } from 'mongoose';
interface getMongooseSchemaObjects_arg {
  schemaConstraints: Record<string, any>; // Adjust the type for schemaConstraints as needed
}
// https://mongoosejs.com/docs/typescript/statics-and-methods.html
export const getMongooseSchemaObjects = <T extends Document, I_METHODS, I_QUERY_METHODS extends Query<T | null, T>, model_type extends Model<T, I_QUERY_METHODS, I_METHODS>>({
  schemaConstraints,
}: getMongooseSchemaObjects_arg): Schema<T, model_type, I_METHODS, I_QUERY_METHODS> => {
  // type model_type = Model<T, {}, I_METHODS>;
  const schema = new Schema<T, model_type, I_METHODS, I_QUERY_METHODS>(schemaConstraints);
  return schema;
};


