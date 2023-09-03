module.exports.getMongooseModels = ({
  modelName,
  schema,
  databaseConnection,
  collectionName,
}) => {
  return databaseConnection.model(modelName, schema, collectionName);
};
