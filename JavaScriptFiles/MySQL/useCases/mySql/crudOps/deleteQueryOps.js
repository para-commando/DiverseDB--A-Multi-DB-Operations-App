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
exports.deleteQueryOps = void 0;
const dataSourceInitialization_1 = require("../utils/dataSourceInitialization");
const clientsEntity_1 = require("../../../entities/mySql/clientsEntity");
const deleteQueryOps = () => __awaiter(void 0, void 0, void 0, function* () {
    const initializedMySqlDataSource = yield (0, dataSourceInitialization_1.getInitializedMySqlDataSource)();
    try {
        // deleting using softDelete() is useful when the extra column @DeleteDateColumn() in the entity is been added. As the data deleted, only using softDelete() is stored in that column, and data deleted using rest of the methods is not stored in that column and hence cant be restored
        yield initializedMySqlDataSource
            .getRepository(clientsEntity_1.Clients)
            .createQueryBuilder()
            .softDelete()
            .where('name = :id', { id: 'Thuppan' })
            .execute();
        const users = yield initializedMySqlDataSource
            .getRepository(clientsEntity_1.Clients)
            .createQueryBuilder()
            .select()
            .withDeleted()
            .execute();
        console.log('🚀 ~ file: queryOps2.ts:59 ~ queryOps ~ users:', users);
        // restoring the data deleted using softDelete. When this is done the corresponding data stored in deletedAt column is made null
        yield initializedMySqlDataSource
            .getRepository(clientsEntity_1.Clients)
            .createQueryBuilder()
            .restore()
            .where('name = :id', { id: 'Thuppan' })
            .execute();
    }
    catch (error) {
        console.log('🚀 ~ file: queryOps.ts:166 ~ queryOps ~ error:', error);
        console.log('🚀 ~ file: createOps.ts:72 ~ aa ~ error:', JSON.stringify(error));
    }
    finally {
        yield initializedMySqlDataSource.destroy();
    }
});
exports.deleteQueryOps = deleteQueryOps;
//# sourceMappingURL=deleteQueryOps.js.map