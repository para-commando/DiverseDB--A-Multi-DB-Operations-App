"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongooseModels = void 0;
const mongoose_1 = require("mongoose");
// https://mongoosejs.com/docs/typescript/statics-and-methods.html
const getMongooseModels = ({ modelName, schema, collectionName, }) => {
    // type UserModel = Model<T, {}, I_METHODS>;
    return (0, mongoose_1.model)(modelName, schema, collectionName);
};
exports.getMongooseModels = getMongooseModels;
//# sourceMappingURL=makeMongooseModels.js.map