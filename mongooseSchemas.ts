import { Schema, Document, Model } from 'mongoose';
interface getMongooseSchemaObjects_arg {
  schemaConstraints: Record<string, any>; // Adjust the type for schemaConstraints as needed
}
// https://mongoosejs.com/docs/typescript/statics-and-methods.html
export const getMongooseSchemaObjects = <T extends Document,model_type,I_METHODS>({
  schemaConstraints,
}: getMongooseSchemaObjects_arg): Schema => {
  // type model_type = Model<T, {}, I_METHODS>;
  const schema = new Schema<T, model_type, I_METHODS>(schemaConstraints);
  return schema;
};


