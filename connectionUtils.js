const { mongoDatabaseClient } = require('./mongoClientConnect');
// Establish the connection once and reuse it across functions
let mongoDatabaseConnections = null;

module.exports.getMongoDataBaseConnection = async (databaseName) => {
  if (!mongoDatabaseConnections) {
    mongoDatabaseConnections = await mongoDatabaseClient(databaseName);
  }
  return mongoDatabaseConnections;
};
