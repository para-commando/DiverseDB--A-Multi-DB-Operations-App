import mongoose, { Connection, Schema, Document, Query, Model } from 'mongoose';

const postsConstraints = {
  title: String,
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel', // Reference to the 'User' model
  },
};
type postsConstraints_type = Document & typeof postsConstraints;
type postsSchemaConstraints_query_methods = Query<
  postsConstraints_type | null,
  postsConstraints_type
> & {};
type postsSchema_methods = {};
export type posts_model_type = Model<
  postsConstraints_type,
  postsSchemaConstraints_query_methods,
  postsSchema_methods
> & {};

const postsSchema = new Schema<
  postsConstraints_type,
  posts_model_type,
  postsSchema_methods,
  postsSchemaConstraints_query_methods
>({
  title: String,
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel', // Reference to the 'User' model
  },
});

postsSchema.pre('save', function (this: Document, next) {
  // 'this' refers to the document being saved
  console.log('Pre-save middleware for User schema');
  next();
});

postsSchema.post('save', function (doc: Document, next) {
  // 'doc' is the saved document
  console.log('Post-save middleware for User schema');
  next();
});

export default mongoose.model<postsConstraints_type, posts_model_type>(
  'PostsModel',
  postsSchema,
  'PostsCollection'
);
