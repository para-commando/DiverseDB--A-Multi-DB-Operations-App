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
exports.updateQueryOps = void 0;
const dataSourceInitialization_1 = require("../utils/dataSourceInitialization");
const clientsEntity_1 = require("../../../entities/mySql/clientsEntity");
const updateQueryOps = () => __awaiter(void 0, void 0, void 0, function* () {
    const initializedMySqlDataSource = yield (0, dataSourceInitialization_1.getInitializedMySqlDataSource)();
    try {
        // update query
        const updateQueryResult = yield initializedMySqlDataSource
            .createQueryBuilder()
            .update(clientsEntity_1.Clients)
            .set({
            name: 'Timber',
        })
            .where('id = :id', { id: 1 })
            .execute();
        console.log('🚀 ~ file: updateQueryOps.ts:19 ~ updateQueryOps ~ updateQueryResult:', updateQueryResult);
    }
    catch (error) {
        console.log('🚀 ~ file: updateQueryOps.ts:21 ~ updateQueryOps ~ error:', JSON.stringify(error));
    }
    finally {
        yield initializedMySqlDataSource.destroy();
    }
});
exports.updateQueryOps = updateQueryOps;
//# sourceMappingURL=updateQueryOps.js.map