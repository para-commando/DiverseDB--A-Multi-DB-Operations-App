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
const entity_1 = require("../../entities/mySql/entity");
const typeorm_1 = require("typeorm");
const aa = () => __awaiter(void 0, void 0, void 0, function* () {
    const aaa = yield (0, dataSourceInitialization_1.getInitializedMySqlDataSource)();
    try {
        // running raw queries
        const rawData = yield aaa.query(`INSERT INTO User (firstName, lastName, isActive) VALUES
    ('John', 'Doe', true),
    ('Alice', 'Smith', false),
    ('Bob', 'Johnson', true);`);
        console.log("🚀 ~ file: createOps.ts:9 ~ aa ~ rawData:", rawData);
        const users = yield aaa
            .createQueryBuilder()
            .select('*')
            .from(entity_1.User, 'user')
            .where(`user.firstName = :name`, { name: 'John' })
            .execute();
        console.log('🚀 ~ file: createOps.ts:16 ~ aa ~ users:', users);
        // SELECT * FROM `User` `user` WHERE `user`.`isActive`=true AND NOT((`user`.`firstName` = 'John' OR `user`.`lastName` = 'Doe'))
        const notUsers = yield aaa
            .createQueryBuilder()
            .select('*')
            .from(entity_1.User, 'user')
            .where(`user.isActive=:value1`, { value1: true })
            .andWhere(new typeorm_1.NotBrackets((qb) => {
            qb.where("user.firstName = :value2", {
                value2: "John",
            }).orWhere("user.lastName = :value3", { value3: "Doe" });
        })).execute();
        console.log('🚀 ~ file: createOps.ts:16 ~ aa ~ notUsers:', notUsers);
        const notUsers2 = yield aaa
            .createQueryBuilder()
            .insert()
            .into(entity_1.User)
            .values([
            { firstName: 'Timber', lastName: 'Saw', isActive: true },
            { firstName: 'Phantom', lastName: 'Lancer', isActive: false },
        ])
            .execute();
        console.log('🚀 ~ file: createOps.ts:49 ~ aa ~ notUsers2:', notUsers2);
        const oo = yield aaa
            .createQueryBuilder(entity_1.User, 'user')
            .where('user.firstName = :name', { name: 'John' })
            .getOne();
        console.log("🚀 ~ file: createOps.ts:55 ~ aa ~ oo:", oo);
        const oo2 = yield aaa
            .createQueryBuilder(entity_1.User, 'user')
            .select('')
            .where('user.firstName = :name', { name: 'John' })
            .getMany();
        console.log("🚀 ~ file: createOps.ts:55 ~ aa ~ oo2:", oo2);
        // Throws error when data is not found
        const oo3 = yield aaa
            .createQueryBuilder(entity_1.User, 'user')
            .select('user.id')
            .where('user.firstName = :name', { name: 'John' })
            .getOneOrFail();
        console.log("🚀 ~ file: createOps.ts:55 ~ aa ~ oo3:", oo3);
    }
    catch (error) {
        console.log("🚀 ~ file: createOps.ts:72 ~ aa ~ error:", JSON.stringify(error));
    }
    finally {
        yield aaa.destroy();
    }
});
aa();
//# sourceMappingURL=operations.js.map