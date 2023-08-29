module.exports.getMongooseSchemaObjects = ({
  mongoDatabaseConnection,
  schemaConstraints,
}) => {
  return new mongoDatabaseConnection.Schema(schemaConstraints);
};
