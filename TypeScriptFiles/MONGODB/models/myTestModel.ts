import mongoose, { Document, Schema, Query, Model } from 'mongoose';

export type testSchemaConstraints_methods = {
  isAgeWithinLimit(age: number, limit: number): boolean;
};
export type testSchemaConstraints_type = Document & {
  name: {
    type: String;
    required: true;
    uppercase: true;
    unique: false;
    minlength: 3;
    maxLength: 40;
  };
  age: {
    type: Number;
    min: 1;
  };
  email: {
    type: String;
  };
  createdAt: {
    type: Date;
    immutable: true;
  };
  updatedAt: {
    type: Date;
    immutable: true;
  };
  bestFriend: Schema.Types.ObjectId;
  hobbies: [String];
  address: {
    street: String;
    city: String;
  };
  greetUser: String; // Include the virtual property
};
export type testSchemaConstraints_query_methods = Query<
  testSchemaConstraints_type | null,
  testSchemaConstraints_type
> & {
  byDateRange(
    this: testSchemaConstraints_query_methods,
    lowerAgeLimit: number,
    upperAgeLimit: number
  ): Promise<testSchemaConstraints_type | null>;
};
export type test_model_type = Model<
  testSchemaConstraints_type,
  testSchemaConstraints_query_methods,
  testSchemaConstraints_methods
> & {
  findByName(username: string): Promise<testSchemaConstraints_type | null>;
};
const testSchema = new Schema<
  testSchemaConstraints_type,
  test_model_type,
  testSchemaConstraints_methods,
  testSchemaConstraints_query_methods
>({
  name: {
    type: String,
    required: true,
    uppercase: true,
    unique: false,
    minlength: 3,
    maxLength: 40,
  },
  age: {
    type: Number,
    min: 1,
  },
  email: {
    type: String,
  },
  createdAt: {
    type: Date,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    immutable: true,
  },
  bestFriend: Schema.Types.ObjectId,
  hobbies: [String],
  address: {
    street: String,
    city: String,
  },
});

testSchema.virtual('greetUser').get(function () {
  // Calculate the discounted price
  return 'Hello,' + this.name;
});
testSchema.statics.findByName = function (
  username: string
): Promise<testSchemaConstraints_type | null> {
  return this.findOne({ name: username });
};
testSchema.methods.isAgeWithinLimit = function (
  ages: number,
  limit: number
): boolean {
  return ages <= limit;
};

testSchema.query.byDateRange = function (
  lowerAgeLimit: number,
  upperAgeLimit: number
) {
  return this.where('age').gte(lowerAgeLimit).lte(upperAgeLimit);
};

export default mongoose.model<testSchemaConstraints_type, test_model_type>(
  'myTestModel',
  testSchema,
  'myTestCollection'
);
