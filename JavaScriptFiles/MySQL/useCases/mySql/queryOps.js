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
const dataSourceInitialization_1 = require("./dataSourceInitialization");
const userEntity_1 = require("../../entities/mySql/userEntity");
const typeorm_1 = require("typeorm");
const clientsEntity_1 = require("../../entities/mySql/clientsEntity");
const clientsPhotoEntity_1 = require("../../entities/mySql/clientsPhotoEntity");
const queryOps = () => __awaiter(void 0, void 0, void 0, function* () {
    const initializedMySqlDataSource = yield (0, dataSourceInitialization_1.getInitializedMySqlDataSource)();
    try {
        // running raw queries
        const rawQueryResult = yield initializedMySqlDataSource.query(`INSERT INTO User (firstName, lastName, isActive) VALUES
    ('John', 'Doe', true),
    ('Alice', 'Smith', false),
    ('Bob', 'Johnson', true);`);
        console.log('🚀 ~ file: queryOps.ts:15 ~ queryOps ~ rawQueryResult:', rawQueryResult);
        const readQueryBuilderType1 = yield initializedMySqlDataSource
            .createQueryBuilder()
            .select('*')
            .from(userEntity_1.User, 'user')
            .where(`user.firstName = :name`, { name: 'John' })
            .execute();
        console.log('🚀 ~ file: queryOps.ts:23 ~ queryOps ~ readQueryBuilderType1:', readQueryBuilderType1);
        // SELECT * FROM `User` `user` WHERE `user`.`isActive`=true AND NOT((`user`.`firstName` = 'John' OR `user`.`lastName` = 'Doe'))
        const readQueryBuilderType2 = yield initializedMySqlDataSource
            .createQueryBuilder()
            .select('*')
            .from(userEntity_1.User, 'user')
            .where(`user.isActive=:value1`, { value1: true })
            .andWhere(new typeorm_1.NotBrackets((qb) => {
            qb.where('user.firstName = :value2', {
                value2: 'John',
            }).orWhere('user.lastName = :value3', { value3: 'Doe' });
        }))
            .execute();
        console.log('🚀 ~ file: queryOps.ts:39 ~ queryOps ~ readQueryBuilderType2:', readQueryBuilderType2);
        const insertQueryBuilderType1 = yield initializedMySqlDataSource
            .createQueryBuilder()
            .insert()
            .into(userEntity_1.User)
            .values([
            { firstName: 'Timber', lastName: 'Saw', isActive: true },
            { firstName: 'Phantom', lastName: 'Lancer', isActive: false },
        ])
            .execute();
        console.log('🚀 ~ file: queryOps.ts:50 ~ queryOps ~ insertQueryBuilderType1:', insertQueryBuilderType1);
        const readQueryBuilderType3 = yield initializedMySqlDataSource
            .createQueryBuilder(userEntity_1.User, 'user')
            .where('user.firstName = :name', { name: 'John' })
            .getOne();
        console.log('🚀 ~ file: queryOps.ts:56 ~ queryOps ~ readQueryBuilderType3:', readQueryBuilderType3);
        const readQueryBuilderType4 = yield initializedMySqlDataSource
            .createQueryBuilder(userEntity_1.User, 'user')
            .select('')
            .where('user.firstName = :name', { name: 'John' })
            .getMany();
        console.log('🚀 ~ file: queryOps.ts:63 ~ queryOps ~ readQueryBuilderType4:', readQueryBuilderType4);
        // Throws error when data is not found
        const readQueryBuilderType5 = yield initializedMySqlDataSource
            .createQueryBuilder(userEntity_1.User, 'user')
            .select('user.id')
            .where('user.firstName = :name', { name: 'John' })
            .getOneOrFail();
        console.log('🚀 ~ file: queryOps.ts:71 ~ queryOps ~ readQueryBuilderType5:', readQueryBuilderType5);
        const readQueryBuilderType6 = yield initializedMySqlDataSource
            .getRepository(userEntity_1.User)
            .createQueryBuilder('user')
            .where('user.firstName = :name', { name: 'John' })
            .getCount();
        console.log('🚀 ~ file: queryOps.ts:101 ~ queryOps ~ readQueryBuilderType6:', readQueryBuilderType6);
        const readQueryBuilderType7 = yield initializedMySqlDataSource
            .getRepository(userEntity_1.User)
            .createQueryBuilder('user')
            .distinctOn(['user.firstName'])
            .where('user.id IN (:...ids)', { ids: [1, 3, 4] })
            .orderBy('user.id', 'DESC')
            .execute();
        console.log('🚀 ~ file: queryOps.ts:101 ~ queryOps ~ readQueryBuilderType7:', readQueryBuilderType7);
        const readQueryBuilderType8 = yield initializedMySqlDataSource
            .getRepository(userEntity_1.User)
            .createQueryBuilder('user')
            .select('user.isActive')
            .where('', {})
            .groupBy('user.isActive')
            .execute();
        console.log('🚀 ~ file: queryOps.ts:101 ~ queryOps ~ readQueryBuilderType8:', readQueryBuilderType8);
        const insertQueryBuilderClientsEntity = yield initializedMySqlDataSource
            .createQueryBuilder()
            .insert()
            .into(clientsEntity_1.Clients)
            .values([
            { name: 'Alason' },
            { name: 'Phantom' },
        ])
            .execute();
        console.log('🚀 ~ file: queryOps.ts:50 ~ queryOps ~ insertQueryBuilderClientsEntity:', insertQueryBuilderClientsEntity);
        const insertQueryBuilderClientPhotoEntity = yield initializedMySqlDataSource
            .createQueryBuilder()
            .insert()
            .into(clientsPhotoEntity_1.ClientPhotos)
            .values([
            { url: 'AlasonCandid.jpg', clientID: 1 },
            { url: 'PhantomCandid.jpg', clientID: 2 },
        ])
            .execute();
        console.log('🚀 ~ file: queryOps.ts:50 ~ queryOps ~ insertQueryBuilderClientPhotoEntity:', insertQueryBuilderClientPhotoEntity);
        const user = yield initializedMySqlDataSource.createQueryBuilder()
            .leftJoinAndSelect("clients.photos", "photo")
            .where("clients.name = :name", { name: "Alason" })
            .getMany();
        console.log("🚀 ~ file: queryOps.ts:163 ~ queryOps ~ user:", user);
    }
    catch (error) {
        console.log('🚀 ~ file: createOps.ts:72 ~ aa ~ error:', JSON.stringify(error));
    }
    finally {
        yield initializedMySqlDataSource.destroy();
    }
});
queryOps();
//# sourceMappingURL=queryOps.js.map