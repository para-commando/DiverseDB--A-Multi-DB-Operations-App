import { Schema, Document } from 'mongoose';
interface getMongooseSchemaObjects_arg {
  schemaConstraints:  Record<string, any>; // Adjust the type for schemaConstraints as needed
}
export const getMongooseSchemaObjects =<T extends Document> ({
  schemaConstraints,
}: getMongooseSchemaObjects_arg): Schema => {
  const schema = new Schema<T>(schemaConstraints);
  return schema;
};
 
 
