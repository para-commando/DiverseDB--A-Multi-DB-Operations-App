require('dotenv').config();
const { mongooseModels } = require('./mongooseModels');
const { dataObjects } = require('./DatabaseSampleDataObjects');
module.exports.mongoDbCreateOperations = async (connection) => {
  try {
    // Define a schema and create a model
    const model = await mongooseModels.myTestModel({
      connection: connection,
      modelName: 'myTestModel',
      refModel: {},
      collectionName: 'myTestCollection',
    });
    const aggregateFunctionValue = await model.aggregate([
      // Match names by a a value that is get all documents whose name match the below value then pass it as input to the next operation under this .aggregate method that is to $group
      { $match: { name: 'JOHN DOE' } },

      // Group persons who have name as above value by their unique email as their group name then compute their average age value of each group
      {
        $group: {
          _id: '$email',
          averageAge: { $avg: '$age' },
        },
      },
    ]);
    console.log(
      '🚀 ~ file: MongoDbOperations.js:25 ~ module.exports.mongoDbCreateOperations= ~ aggregateFunctionValue:',
      aggregateFunctionValue
    );

    // Ensure the indexes are applied

    // Insert many documents using .create() method

    const insertManyResult = await model.create(
      dataObjects.mongDatabaseDataObjects.sampleInsertData
    );
    console.log(
      '🚀 Total documents inserted using .create method:  ',
      insertManyResult.length
    );

    // Insert many documents using the instance method

    const instances = dataObjects.mongDatabaseDataObjects.sampleInsertData.map(
      (item) => new model(item)
    );

    const promises = instances.map((instance) => instance.save());

    const insertingMultipleDocuments = await Promise.all(promises);
    console.log(
      '🚀 Total documents inserted using instance method:  ',
      insertingMultipleDocuments.length
    );

    // ************************ UseCase-2 *******************************

    // Create the Person model
    const PersonModel = await mongooseModels.PersonModel({
      connection: connection,
      modelName: 'PersonModel',
      refModel: { PersonModel: 'PersonModel' },
      collectionName: 'PersonCollection',
    });

    const alice = new PersonModel({ name: 'Alice', age: 28 });
    const bob = new PersonModel({ name: 'Bob', age: 30 });

    // Assume alice is best friends with bob
    alice.bestFriend = bob._id; // _id is the ObjectId of the bob document
    await alice.save();
    await bob.save();

    // ************************ UseCase-3 *******************************
    const UserModel = await mongooseModels.UserModel({
      connection: connection,
      modelName: 'UserModel',
      collectionName: 'UserCollection',
    });

    const PostsModel = await mongooseModels.PostsModel({
      connection: connection,
      modelName: 'PostsModel',
      refModel: { UserModel: 'UserModel' },
      collectionName: 'PostsCollection',
    });
    const newUser = new UserModel({
      username: 'john_doe',
      email: 'john@example.com',
    });
    await newUser.updateEmail('new.email@example.com');

    // Save the user document
    await newUser.save();

    // Create a new post and associate it with the user
    const newPost = new PostsModel({
      title: 'My First Post',
      content: 'This is the content of my post.',
      author: newUser._id, // Assign the user's _id to the author field
    });

    // Save the post document
    await newPost.save();
  } catch (err) {
    console.error(`Error inserting documents: ${err}`);
    throw err;
  }
};

module.exports.mongoDbReadOperations = async (connection) => {
  try {
    // if used any other Read methods apart from these like findOneAndUpdate then during the updation part schema validation will be bypassed
    const myTestModel = await mongooseModels.myTestModel({
      connection: connection,
      modelName: 'myTestModel',
      refModel: {},
      collectionName: 'myTestCollection',
    });
    const PostsModel = await mongooseModels.PostsModel({
      connection: connection,
      modelName: 'PostsModel',
      refModel: { UserModel: 'UserModel' },
      collectionName: 'PostsCollection',
    });
    const PersonModel = await mongooseModels.PersonModel({
      connection: connection,
      modelName: 'PersonModel',
      refModel: { PersonModel: 'PersonModel' },
      collectionName: 'PersonCollection',
    });
    const testingVirtualProperty = await myTestModel.findOne({
      name: 'John Doe',
    });
    console.log(
      '🚀 ~ file: MongoDbOperations.js:131 ~ module.exports.mongoDbReadOperations= ~ testingVirtualProperty.greetUser: ',
      testingVirtualProperty.greetUser
    );
    const readOperationVariations = {
      find: await myTestModel.find({ name: 'John Doe', }).select('-name -updatedAt -hobbies -address -age'),
      findOne: await myTestModel.findOne({ name: 'John Doe' }),
      findById: await myTestModel.findById({ _id: '64ef82e540539ad992194b3f' }),
      exists: await myTestModel.exists({ age: 22 }),
      clauses: {
        case1: await myTestModel
          .where('name')
          .equals('JOHN DOE')
          .where('age')
          .gte(40)
          .limit(1)
          .select('createdAt updatedAt'),
        case2: await PersonModel.where('name')
          .equals('Alice')
          .limit(1)
          .populate('bestFriend'),
        case3: await PersonModel.findByName('Alice'),
        case4: await PersonModel.find().byName('Alice'),
      },
      populate: await PostsModel.find({ title: 'My First Post' }).populate(
        'author'
      ),
    };
    console.log(
      '🚀 ~ file: MongoDbOperations.js:84 ~ module.exports.mongoDbReadOperations= ~ readOperationVariations:',
      readOperationVariations
    );
  } catch (err) {
    console.error(`Error Finding documents: ${err}`);
    throw err;
  }
};
