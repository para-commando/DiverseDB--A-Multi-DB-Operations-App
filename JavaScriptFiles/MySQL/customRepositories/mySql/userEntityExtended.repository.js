"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
// helps to extend the base model with custom methods/functionality
const mySqlOrmConfig_1 = require("../../Configs/mySqlOrmConfig");
const userEntity_1 = require("../../entities/mySql/userEntity");
exports.UserRepository = mySqlOrmConfig_1.MysqlDataSource.getRepository(userEntity_1.User).extend({
    findByName(firstName, lastName) {
        return this.createQueryBuilder('user')
            .where('user.firstName = :firstName', { firstName })
            .andWhere('user.lastName = :lastName', { lastName })
            .getMany();
    },
});
//# sourceMappingURL=userEntityExtended.repository.js.map