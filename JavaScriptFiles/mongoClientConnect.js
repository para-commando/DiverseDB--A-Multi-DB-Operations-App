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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDatabaseClient = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoDatabaseClient = (database) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = process.env.MONGODB_USERNAME;
        const password = process.env.MONGODB_PASSWORD;
        const clusterUrl = process.env.MONGODB_CLUSTER_URL;
        const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/${database}`;
        yield mongoose_1.default.connect(uri, { retryWrites: true, w: 'majority' });
        console.log('MongoDB 🌱 Connection 🔗 Successful 🌞🌞!!');
        return mongoose_1.default.connection;
    }
    catch (error) {
        console.error('🚀 ~ file: mongoClientConnect.ts:14 ~ module.exports.mongoDatabaseClient= ~ error:', error);
        throw error;
    }
});
exports.mongoDatabaseClient = mongoDatabaseClient;
//# sourceMappingURL=mongoClientConnect.js.map