import mongoose, { Mongoose } from 'mongoose';

export const mongoDatabaseClient = async (database: string): Promise<Mongoose> => {
  try {
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;
    const clusterUrl = process.env.MONGODB_CLUSTER_URL;
    const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/`;

    const mongoDbClient = await mongoose.connect(`${uri}${database}`);
    console.log('MongoDB 🌱 Connection 🔗 Successful 🌞🌞!!');
    return mongoDbClient;
  } catch (error) {
    console.error(
      '🚀 ~ file: mongoClientConnect.ts:14 ~ module.exports.mongoDatabaseClient= ~ error:',
      error
    );
    throw error;
  }
};
