"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongooseSchemaObjects = void 0;
const mongoose_1 = require("mongoose");
// https://mongoosejs.com/docs/typescript/statics-and-methods.html
const getMongooseSchemaObjects = ({ schemaConstraints, }) => {
    // type model_type = Model<T, {}, I_METHODS>;
    const schema = new mongoose_1.Schema(schemaConstraints);
    return schema;
};
exports.getMongooseSchemaObjects = getMongooseSchemaObjects;
//# sourceMappingURL=mongooseSchemas.js.map