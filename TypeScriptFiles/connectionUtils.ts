import {   Connection } from 'mongoose';

import { mongoDatabaseClient } from "./mongoClientConnect"
// Establish the connection once and reuse it across functions
let mongoDatabaseConnections: Promise<Connection> | null = null;

export const getMongoDataBaseConnection = async (databaseName: string): Promise<Connection> => {
  if (!mongoDatabaseConnections) {
    mongoDatabaseConnections = mongoDatabaseClient(databaseName);
  }
  return await mongoDatabaseConnections;
};
