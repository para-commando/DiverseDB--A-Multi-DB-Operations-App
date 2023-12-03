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
exports.getInitializedMySqlDataSource = void 0;
const mySqlOrmConfig_1 = require("../../../Configs/mySqlOrmConfig");
const getInitializedMySqlDataSource = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mySqlOrmConfig_1.MysqlDataSource.initialize();
        const isMySqlDataSourceInitialized = mySqlOrmConfig_1.MysqlDataSource.isInitialized;
        if (isMySqlDataSourceInitialized) {
            console.log('MySqlDataSource Initialized successfully..');
        }
        else {
            throw new Error('MySqlDataSource initialization failed');
        }
    }
    catch (err) {
        console.log('🚀 ~ file: dbOps.ts:14 ~ initializedMysqlDataSource ~ err:', err);
        throw err;
    }
    return mySqlOrmConfig_1.MysqlDataSource;
});
exports.getInitializedMySqlDataSource = getInitializedMySqlDataSource;
//# sourceMappingURL=dataSourceInitialization.js.map