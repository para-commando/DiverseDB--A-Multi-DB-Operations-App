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
exports.createQueryOps = void 0;
const dataSourceInitialization_1 = require("./dataSourceInitialization");
const userEntity_1 = require("../../entities/mySql/userEntity");
const clientsEntity_1 = require("../../entities/mySql/clientsEntity");
const clientsPhotoEntity_1 = require("../../entities/mySql/clientsPhotoEntity");
const createQueryOps = () => __awaiter(void 0, void 0, void 0, function* () {
    const initializedMySqlDataSource = yield (0, dataSourceInitialization_1.getInitializedMySqlDataSource)();
    try {
        // running raw queries
        const rawQueryResult = yield initializedMySqlDataSource.query(`INSERT INTO User (firstName, lastName, isActive) VALUES
      ('John', 'Doe', true),
      ('Alice', 'Smith', false),
      ('Bob', 'Johnson', true);`);
        console.log('🚀 ~ file: createQueryOps.ts:15 ~ createQueryOps ~ rawQueryResult:', rawQueryResult);
        const insertQueryBuilderType1 = yield initializedMySqlDataSource
            .createQueryBuilder()
            .insert()
            .into(userEntity_1.User)
            .values([
            { firstName: 'Timber', lastName: 'Saw', isActive: true },
            { firstName: 'Phantom', lastName: 'Lancer', isActive: false },
        ])
            .execute();
        console.log('🚀 ~ file: createQueryOps.ts:50 ~ createQueryOps ~ insertQueryBuilderType1:', insertQueryBuilderType1);
        const insertQueryBuilderClientsEntity = yield initializedMySqlDataSource
            .createQueryBuilder()
            .insert()
            .into(clientsEntity_1.Clients)
            .values([{ name: 'Alason' }, { name: 'Phantom' }])
            .execute();
        console.log('🚀 ~ file: createQueryOps.ts:50 ~ createQueryOps ~ insertQueryBuilderClientsEntity:', insertQueryBuilderClientsEntity);
        const insertQueryBuilderClientPhotoEntity = yield initializedMySqlDataSource
            .createQueryBuilder()
            .insert()
            .into(clientsPhotoEntity_1.ClientPhotos)
            .values([
            { url: 'AlasonCandid.jpg', clientID: 1 },
            { url: 'PhantomCandid.jpg', clientID: 2 },
        ])
            .execute();
        console.log('🚀 ~ file: createQueryOps.ts:50 ~ createQueryOps ~ insertQueryBuilderClientPhotoEntity:', insertQueryBuilderClientPhotoEntity);
        const upsertQuery = yield initializedMySqlDataSource
            .createQueryBuilder()
            .insert()
            .into(userEntity_1.User)
            .values({
            firstName: 'Timber',
            lastName: 'Pipes',
            isActive: false,
        })
            .orUpdate(['firstName', 'lastName'], ['isActive'])
            .execute();
        console.log('🚀 ~ file: queryOps2.ts:100 ~ queryOps ~ upsertQuery:', upsertQuery);
    }
    catch (error) {
        console.log('🚀 ~ file: createQueryOps.ts:59 ~ createQueryOps ~ error:', JSON.stringify(error));
    }
    finally {
        yield initializedMySqlDataSource.destroy();
    }
});
exports.createQueryOps = createQueryOps;
//# sourceMappingURL=createQueryOps.js.map