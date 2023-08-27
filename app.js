const { MongoClient } = require('mongodb');
require('dotenv').config();
async function mongoDbOperations() {
  const username = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;
  const clusterUrl = process.env.MONGODB_CLUSTER_URL;
  const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/`;

  // The MongoClient is the object that references the connection to our
  // datastore (Atlas, for example)
  const client = new MongoClient(uri);

  // The connect() method does not attempt a connection; instead it instructs
  // the driver to connect using the settings provided when a connection
  // is required.
  await client.connect();

  console.log('MongoDB 🌱 Connection 🔗 Successful 🌞🌞!!');

  // Provide the name of the database and collection you want to use.
  // If the database and/or collection do not exist, the driver and Atlas
  // will create them automatically when you first write data.
  const dbName = 'MyMongoDB';
  const collectionName = 'MyCollection1';

  // Create references to the database and collection in order to run
  // operations on them.
  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  /*
   *  *** INSERT DOCUMENTS ***
   *
   * You can insert individual documents using collection.insert().
   * In this example, we're going to create four documents and then
   * insert them all in one call with collection.insertMany().
   */

  const recipes = [
    {
      name: 'elotes',
      ingredients: [
        'corn',
        'mayonnaise',
        'cotija cheese',
        'sour cream',
        'lime',
      ],
      prepTimeInMinutes: 35,
    },
    {
      name: 'loco moco',
      ingredients: [
        'ground beef',
        'butter',
        'onion',
        'egg',
        'bread bun',
        'mushrooms',
      ],
      prepTimeInMinutes: 54,
    },
    {
      name: 'patatas bravas',
      ingredients: [
        'potato',
        'tomato',
        'olive oil',
        'onion',
        'garlic',
        'paprika',
      ],
      prepTimeInMinutes: 80,
    },
    {
      name: 'fried rice',
      ingredients: [
        'rice',
        'soy sauce',
        'egg',
        'onion',
        'pea',
        'carrot',
        'sesame oil',
      ],
      prepTimeInMinutes: 40,
    },
  ];

  try {
    const insertManyResult = await collection.insetMany(recipes);
    console.log(
      '🚀 ~ file: app.js:98 ~ run ~ insertManyResult:',
      insertManyResult
    );
    console.log(
      `${insertManyResult.insertedCount} documents successfully inserted.\n`
    );
  } catch (err) {
    console.error(
      `Something went wrong trying to insert the new documents: ${err}\n`
    );
  }

  await client.close();
}
mongoDbOperations().catch((error) => {
  console.log('🚀 ~ file: app.js:98 ~ run ~ error:', error);
});
