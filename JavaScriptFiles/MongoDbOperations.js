"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDbDeleteOperations = exports.mongoDbUpdateOperations = exports.mongoDbReadOperations = exports.mongoDbCreateOperations = void 0;
require('dotenv').config();
const mongooseModels_1 = require("./mongooseModels");
const mongoDbCreateOperations = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Define a schema and create a model
        yield mongooseModels_1.mongooseModels.myTestModel_create_ops({
            connection: connection,
            modelName: 'myTestModel',
            refModel: {},
            collectionName: 'myTestCollection',
        });
        yield mongooseModels_1.mongooseModels.PersonModel_create_ops({
            connection: connection,
            modelName: 'PersonModel',
            refModel: { PersonModel: 'PersonModel' },
            collectionName: 'PersonCollection',
        });
        yield mongooseModels_1.mongooseModels.UserModel_create_ops({
            connection: connection,
            modelName: 'UserModel',
            collectionName: 'UserCollection',
        });
        yield mongooseModels_1.mongooseModels.PostsModel_create_ops({
            connection: connection,
            modelName: 'PostsModel',
            refModel: { userModel: 'UserModel' },
            collectionName: 'PostsCollection',
        });
        return true;
    }
    catch (err) {
        console.error(`Error inserting documents: ${err}`);
        throw err;
    }
});
exports.mongoDbCreateOperations = mongoDbCreateOperations;
const mongoDbReadOperations = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if used any other Read methods apart from these like findOneAndUpdate then during the updation part schema validation will be bypassed in order to solve that issue we need to use the option   { runValidators: true }, while using that
        yield mongooseModels_1.mongooseModels.myTestModel_read_ops({
            connection: connection,
            modelName: 'myTestModel',
            refModel: {},
            collectionName: 'myTestCollection',
        });
        yield mongooseModels_1.mongooseModels.PostsModel_read_ops({
            connection: connection,
            modelName: 'PostsModel',
            refModel: { userModel: 'UserModel' },
            collectionName: 'PostsCollection',
        });
        yield mongooseModels_1.mongooseModels.PersonModel_read_ops({
            connection: connection,
            modelName: 'PersonModel',
            refModel: { PersonModel: 'PersonModel' },
            collectionName: 'PersonCollection',
        });
        return true;
    }
    catch (err) {
        console.error(`Error Finding documents: ${err}`);
        throw err;
    }
});
exports.mongoDbReadOperations = mongoDbReadOperations;
const mongoDbUpdateOperations = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongooseModels_1.mongooseModels.PersonModel_update_ops({
            connection: connection,
            modelName: 'PersonModel',
            refModel: { PersonModel: 'PersonModel' },
            collectionName: 'PersonCollection',
        });
        return true;
    }
    catch (err) {
        console.error(`Error updating documents: ${err}`);
        throw err;
    }
});
exports.mongoDbUpdateOperations = mongoDbUpdateOperations;
const mongoDbDeleteOperations = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongooseModels_1.mongooseModels.myTestModel_delete_ops({
            connection: connection,
            modelName: 'myTestModel',
            refModel: {},
            collectionName: 'myTestCollection',
        });
        yield mongooseModels_1.mongooseModels.PersonModel_delete_ops({
            connection: connection,
            modelName: 'PersonModel',
            refModel: { PersonModel: 'PersonModel' },
            collectionName: 'PersonCollection',
        });
        yield mongooseModels_1.mongooseModels.PostsModel_delete_ops({
            connection: connection,
            modelName: 'PostsModel',
            refModel: { userModel: 'UserModel' },
            collectionName: 'PostsCollection',
        });
    }
    catch (err) {
        console.error(`Error deleting documents: ${err}`);
        throw err;
    }
});
exports.mongoDbDeleteOperations = mongoDbDeleteOperations;
//# sourceMappingURL=MongoDbOperations.js.map