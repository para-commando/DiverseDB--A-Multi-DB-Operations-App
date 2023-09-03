import { Mongoose } from 'mongoose';

import { mongoDatabaseClient } from "./mongoClientConnect"
// Establish the connection once and reuse it across functions
let mongoDatabaseConnections: Promise<Mongoose> | null = null;

module.exports.getMongoDataBaseConnection = async (databaseName: string): Promise<Mongoose> => {
  if (!mongoDatabaseConnections) {
    mongoDatabaseConnections = mongoDatabaseClient(databaseName);
  }
  return await mongoDatabaseConnections;
};
