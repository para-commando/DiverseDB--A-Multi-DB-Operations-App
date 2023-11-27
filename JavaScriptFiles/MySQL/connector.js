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
const mySqlOrmConfig_1 = require("./Configs/mySqlOrmConfig");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('🚀 ~ file: connector.ts:8 ~ main ~ process.env.MYSQL_HOST:', process.env.MYSQL_HOST);
        const connection = yield (0, typeorm_1.createConnection)(mySqlOrmConfig_1.MySqlConfigObject);
        console.log('Connected to MySQL server successfully');
        yield connection.close();
    }
    catch (error) {
        console.log('🚀 ~ file: connector.ts:15 ~ main ~ error:', error);
        throw new Error('MySQL DB connection failed');
    }
});
main();
//# sourceMappingURL=connector.js.map