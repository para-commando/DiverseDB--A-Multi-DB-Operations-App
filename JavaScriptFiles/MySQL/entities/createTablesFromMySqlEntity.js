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
exports.createTableForMySqlEntity = void 0;
const typeorm_1 = require("typeorm");
const mySqlOrmConfig_1 = require("../Configs/mySqlOrmConfig");
const dataSourceInitialization_1 = require("../useCases/mySql/dataSourceInitialization");
const createTableForMySqlEntity = (entity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const initializedMySqlDataSource = yield (0, dataSourceInitialization_1.getInitializedMySqlDataSource)();
        if (initializedMySqlDataSource.hasMetadata(entity))
            console.log('asfdffffffff');
        const userMetadata = initializedMySqlDataSource.getMetadata(entity);
        console.log('🚀 ~ file: createTablesFromMySqlEntity.ts:8 ~ createTableForMySqlEntity ~ userMetadata:', userMetadata);
        yield (0, typeorm_1.createConnection)(mySqlOrmConfig_1.MySqlConfigObject);
    }
    catch (e) {
        console.log('🚀 ~ file: createTablesFromMySqlEntity.ts:14 ~ createTableForMySqlEntity ~ e:', e);
        throw new Error('Failed to create table for Entity');
    }
});
exports.createTableForMySqlEntity = createTableForMySqlEntity;
//# sourceMappingURL=createTablesFromMySqlEntity.js.map