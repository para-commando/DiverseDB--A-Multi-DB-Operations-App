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
const typeorm_1 = require("typeorm");
require("dotenv/config");
const client_1 = require("./entities/client");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("🚀 ~ file: connector.ts:8 ~ main ~ process.env.MYSQL_HOST:", process.env.MYSQL_HOST);
        yield (0, typeorm_1.createConnection)({
            type: 'mysql',
            host: process.env.MYSQL_HOST || '',
            port: parseInt(process.env.MYSQL_PORT || '3306', 10),
            username: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            entities: [client_1.Client],
            synchronize: true
        });
        console.log('Connected to MySQL server successfully');
    }
    catch (error) {
        console.log('🚀 ~ file: connector.ts:15 ~ main ~ error:', error);
        throw new Error('MySQL DB connection failed');
    }
});
main();
//# sourceMappingURL=connector.js.map