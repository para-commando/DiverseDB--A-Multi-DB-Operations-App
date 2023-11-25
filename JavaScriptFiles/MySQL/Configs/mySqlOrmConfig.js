"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlDataSource = void 0;
const typeorm_1 = require("typeorm");
require("dotenv/config");
exports.MysqlDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: false,
    logging: true,
    entities: ['TypeScriptFiles/MySQL/entities/mySql/*.ts'],
    migrationsTableName: 'migrations',
    migrations: ['TypeScriptFiles/MySQL/migrations/mySql/*.ts'],
});
//# sourceMappingURL=mySqlOrmConfig.js.map