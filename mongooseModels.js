module.exports.getMongooseModels = ({
  modelName,
  schema,
  databaseConnection,
}) => {
  return databaseConnection.model(modelName, schema);
};
