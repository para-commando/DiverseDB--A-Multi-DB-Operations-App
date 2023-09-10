import mongoose, { Connection, Schema, Document, Query, Model } from 'mongoose';

const personSchemaConstraints = {
  name: { type: String, required: true },
  age: {
    type: Number,
    validate: {
      validator: (age: number) => age <= 150,
      message: (props: { path: string; value: String | Number }) =>
        `${props.path} input(${props.value}) is  greater than 150`,
    },
  },
  bestFriend: {
    type: Schema.Types.ObjectId,
    ref: 'PersonModel',
  }, // Reference to another Person document
};
type personSchemaConstraints_type = Document & typeof personSchemaConstraints;

type personSchemaConstraints_methods = {
  isAgeWithinLimit(age: number, limit: number): boolean;
  updateTitle(newTitle: string): void;
  validateData(data: unknown): boolean;
};

type personSchemaConstraints_query_methods = Query<
  personSchemaConstraints_type | null,
  personSchemaConstraints_type
> & {
  byName(
    this: personSchemaConstraints_query_methods,
    name: string
  ): Promise<personSchemaConstraints_type | null>;
  sortByField(
    this: personSchemaConstraints_query_methods,
    field: string
  ): Promise<personSchemaConstraints_type | null>;
  byDateRange(
    this: personSchemaConstraints_query_methods,
    lowerAgeLimit: number,
    upperAgeLimit: number
  ): Promise<personSchemaConstraints_type | null>;
};
// for statics we need to extend from Model<T>
export type person_model_type = Model<
  personSchemaConstraints_type,
  personSchemaConstraints_query_methods,
  personSchemaConstraints_methods
> & {
  findByName(username: string): Promise<personSchemaConstraints_type | null>;
};

const personSchema = new Schema<
  personSchemaConstraints_type,
  person_model_type,
  personSchemaConstraints_methods,
  personSchemaConstraints_query_methods
>({
  name: { type: String, required: true },
  age: {
    type: Number,
    validate: {
      validator: (age: number) => age <= 150,
      message: (props: { path: string; value: String | Number }) =>
        `${props.path} input(${props.value}) is  greater than 150`,
    },
  },
  bestFriend: {
    type: Schema.Types.ObjectId,
    ref: 'PersonModel',
  }, // Reference to another Person document
});

personSchema.statics.findByName = function (
  username: string
): Promise<personSchemaConstraints_type | null> {
  return this.findOne({ name: username });
};

// query methods are the ones which can only be used post one query operation that is needs a query object for its performance which is normally used to create a custom query to chain with existing ones which are unlike static methods which can be called directly over a model
// also it would be better to use it over a .find() query object as the below implementation corresponds to it as well also i read that the query object which one gets upon which we apply below implementation is bit specific to the type of query object we call. For example .find() returns a query object which can be used for find operations
personSchema.query.byName = function (
  this: personSchemaConstraints_query_methods,
  name: string
): Promise<personSchemaConstraints_type | null> {
  return this.where({ name: name });
};
personSchema.query.sortByField = function (
  this: personSchemaConstraints_query_methods,
  field: string
): Promise<personSchemaConstraints_type | null> {
  return this.sort({ [field]: 'asc' });
};
personSchema.query.byDateRange = function (
  this: personSchemaConstraints_query_methods,
  lowerAgeLimit: number,
  upperAgeLimit: number
): Promise<personSchemaConstraints_type | null> {
  return this.where('age').gte(lowerAgeLimit).lte(upperAgeLimit);
};
// Instance methods: unlike query and static methods this methods are applied on each documents of the respective model/collection
// these are different from .virtual as these are parameterized and virtuals are not
personSchema.methods.isAgeWithinLimit = function (
  age: number,
  limit: number
): boolean {
  return age <= limit;
};
personSchema.methods.updateTitle = function (newTitle: string): void {
  this.title = newTitle;
  this.save();
  return;
};
personSchema.methods.validateData = function (data: unknown): boolean {
  // validate the data using required mechanism and return true if it passes else false
  if (typeof data === 'string') return true;
  else return false;
};
export default mongoose.model<personSchemaConstraints_type, person_model_type>(
  'PersonModel',
  personSchema,
  'PersonCollection'
);
