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
const clientsEntity_1 = require("../../entities/mySql/clientsEntity");
const queryOps = () => __awaiter(void 0, void 0, void 0, function* () {
    const initializedMySqlDataSource = yield (0, dataSourceInitialization_1.getInitializedMySqlDataSource)();
    try {
        // takes only first 2 of the left join results
        const leftJoinOnClients = yield initializedMySqlDataSource
            .createQueryBuilder(clientsEntity_1.Clients, 'client')
            .leftJoinAndSelect('client.photos', 'photo')
            .take(2)
            .getMany();
        console.log('🚀 ~ file: queryOps.ts:166 ~ queryOps ~ leftJoinOnClients:', leftJoinOnClients);
        // skips first 4 and takes next 2
        const leftJoinOnClients2 = yield initializedMySqlDataSource
            .createQueryBuilder(clientsEntity_1.Clients, 'client')
            .leftJoinAndSelect('client.photos', 'photo')
            .skip(4)
            .take(2)
            .maxExecutionTime(1000) // milliseconds.
            .getMany();
        console.log('🚀 ~ file: queryOps.ts:166 ~ queryOps ~ leftJoinOnClients2:', leftJoinOnClients2);
        // setting locks: Sets the lock mode to "pessimistic_write." This means that when the query is executed, it will attempt to acquire a write lock on the selected rows, preventing other transactions from writing to those rows until the lock is released.
        // concepts: PESSIMISTIC_READ: you obtain a lock on the record at the start of the transaction, for the purpose of reading only. Basically you're saying "I don't want anyone updating this record while I'm reading it, but I don't mind others reading it as well". That means people also attempting a PESSIMISTIC_READ will succeed, but those attempting a PESSIMISTIC_WRITE will fail
        // concepts: PESSIMISTIC_WRITE: you obtain a lock on the record at the start of the transaction, for the purpose of writing. What you're saying is "I'm going to be updating this record, so no one can read or write to it until I'm done". That means both those attempting a PESSIMISTIC_READ or PESSIMISTIC_WRITE will fail
        const leftJoinOnClients3 = yield initializedMySqlDataSource
            .createQueryBuilder(clientsEntity_1.Clients, 'client')
            .leftJoinAndSelect('client.photos', 'photo')
            .skip(4)
            .take(2)
            .setLock('pessimistic_write')
            .getMany()
            .catch((error) => {
            console.log(error.message);
        });
        console.log('🚀 ~ file: queryOps.ts:166 ~ queryOps ~ leftJoinOnClients3:', leftJoinOnClients3);
        const users = yield initializedMySqlDataSource
            .getRepository(clientsEntity_1.Clients)
            .createQueryBuilder()
            .select()
            .withDeleted()
            .execute();
        console.log('🚀 ~ file: queryOps2.ts:59 ~ queryOps ~ users:', users);
        // deleting using softDelete() is useful when the extra column @DeleteDateColumn() in the entity is been added. As the data deleted, only using softDelete() is stored in that column, and data deleted using rest of the methods is not stored in that column and hence cant be restored
        yield initializedMySqlDataSource
            .getRepository(clientsEntity_1.Clients)
            .createQueryBuilder()
            .softDelete()
            .where('name = :id', { id: 'Thuppan' })
            .execute();
        // restoring the data deleted using softDelete. When this is done the corresponding data stored in deletedAt column is made null
        yield initializedMySqlDataSource
            .getRepository(clientsEntity_1.Clients)
            .createQueryBuilder()
            .restore()
            .where('name = :id', { id: 'Thuppan' })
            .execute();
        // update query
        yield initializedMySqlDataSource
            .createQueryBuilder()
            .update(clientsEntity_1.Clients)
            .set({
            name: 'Timber',
        })
            .where('id = :id', { id: 1 })
            .execute();
        // insert queries
        // If the values you are trying to insert conflict due to existing data the orUpdate function can be used to update specific values on the conflicted target.
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
        console.log('🚀 ~ file: queryOps.ts:166 ~ queryOps ~ error:', error);
        console.log('🚀 ~ file: createOps.ts:72 ~ aa ~ error:', JSON.stringify(error));
    }
    finally {
        yield initializedMySqlDataSource.destroy();
    }
});
queryOps();
//# sourceMappingURL=queryOps2.js.map