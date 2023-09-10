import mongoose, { Connection } from 'mongoose';

export const mongoDatabaseClient = async (database: string): Promise<Connection> => {
  try {
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;
    const clusterUrl = process.env.MONGODB_CLUSTER_URL;
    const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/${database}`;
    
    await mongoose.connect(uri, { retryWrites: true, w: 'majority' });
    console.log('MongoDB 🌱 Connection 🔗 Successful 🌞🌞!!');
    
    return mongoose.connection as Connection;
  } catch (error) {
    console.error(
      '🚀 ~ file: mongoClientConnect.ts:14 ~ module.exports.mongoDatabaseClient= ~ error:',
      error
    );
    throw error;
  }
};
