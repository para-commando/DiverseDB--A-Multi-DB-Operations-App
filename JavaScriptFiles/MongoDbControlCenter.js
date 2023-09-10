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
exports.mongoDatabaseCRUD_Ops = void 0;
const connectionUtils_1 = require("./connectionUtils");
const MongoDbOperations_1 = require("./MongoDbOperations");
const mongoDatabaseCRUD_Ops = () => __awaiter(void 0, void 0, void 0, function* () {
    let connection = yield (0, connectionUtils_1.getMongoDataBaseConnection)('MyMongoDB');
    try {
        yield (0, MongoDbOperations_1.mongoDbCreateOperations)(connection);
        return true;
    }
    catch (err) {
        console.log('🚀 ~ file: app.js:81 ~ err:', err);
        throw err;
    }
    finally {
        if (connection) {
            yield connection.close(); // Use .close() instead of .disconnect()
        }
    }
});
exports.mongoDatabaseCRUD_Ops = mongoDatabaseCRUD_Ops;
//# sourceMappingURL=MongoDbControlCenter.js.map