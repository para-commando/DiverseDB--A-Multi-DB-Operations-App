const mongoose = require('mongoose');

module.exports.mongoDatabaseClient = async (database) => {
  try {
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;
    const clusterUrl = process.env.MONGODB_CLUSTER_URL;
    const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/`;

    const mongoDbClient = await mongoose
      .createConnection(`${uri}${database}`)
      .asPromise();
    console.log('MongoDB 🌱 Connection 🔗 Successful 🌞🌞!!');
    return mongoDbClient;
  } catch (error) {
    console.log(
      '🚀 ~ file: mongoClientConnect.js:14 ~ module.exports.mongoDatabaseClient= ~ error:',
      error
    );
    throw error;
  }
};
