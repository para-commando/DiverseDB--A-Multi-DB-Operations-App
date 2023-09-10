import { getMongoDataBaseConnection } from './connectionUtils';
import {
  mongoDbCreateOperations,

} from './MongoDbOperations';
import { Connection } from 'mongoose';

export const mongoDatabaseCRUD_Ops = async () => {
  let connection: Connection = await getMongoDataBaseConnection('MyMongoDB');

  try {
    await mongoDbCreateOperations(connection);

    return true;
  } catch (err) {
    console.log('🚀 ~ file: app.js:81 ~ err:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close(); // Use .close() instead of .disconnect()
    }
  }
};
