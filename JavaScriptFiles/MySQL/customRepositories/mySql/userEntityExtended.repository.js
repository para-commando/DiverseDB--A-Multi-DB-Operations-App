"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
// helps to extend the base model with custom methods/functionality
const mySqlOrmConfig_1 = require("../../Configs/mySqlOrmConfig");
const entity_1 = require("../../entities/mySql/entity");
exports.UserRepository = mySqlOrmConfig_1.MysqlDataSource.getRepository(entity_1.User).extend({
    findByName(firstName, lastName) {
        return this.createQueryBuilder('user')
            .where('user.firstName = :firstName', { firstName })
            .andWhere('user.lastName = :lastName', { lastName })
            .getMany();
    },
});
//# sourceMappingURL=userEntityExtended.repository.js.map