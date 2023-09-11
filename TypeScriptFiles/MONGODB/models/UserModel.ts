import mongoose, { Connection, Schema, Document, Query, Model } from 'mongoose';

const userSchemaConstraints = {
  username: String,
  email: String,
};
type userSchemaConstraints_type = Document & {
  username: string;
  email: string;
};
type userSchemaConstraints_query_methods = Query<
  userSchemaConstraints_type | null,
  userSchemaConstraints_type
> & {};
type userSchema_methods = {
  updateEmail(newEmail: String): any;
  sayHi(): string;
};
export type user_model_type = Model<
  userSchemaConstraints_type,
  userSchemaConstraints_query_methods,
  userSchema_methods
> & {};

const userSchema = new Schema<
  userSchemaConstraints_type,
  user_model_type,
  userSchema_methods,
  userSchemaConstraints_query_methods
>({
  username: String,
  email: String,
});

userSchema.methods.updateEmail = async function (newEmail: string) {
  this.email = newEmail;
 await this.save();
  return;
};
userSchema.methods.sayHi = function (): string {
  console.log(
    '🚀 ~ file: mongooseModels.js:76 ~ UserModel: user greeting message: ',
    'Heyyyy ' + this.username
  );
  return 'Heyyyy ' + this.username;
};
userSchema.pre('save', function (this: Document, next) {
  // 'this' refers to the document being saved
  console.log('Pre-save middleware for User schema');
  next();
});

export default mongoose.model<userSchemaConstraints_type, user_model_type>(
  'UserModel',
  userSchema,
  'UserCollection'
);
