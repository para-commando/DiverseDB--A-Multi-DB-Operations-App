"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlDataSource = exports.MySqlConfigObject = void 0;
const typeorm_1 = require("typeorm");
require("dotenv/config");
const userEntity_1 = require("../entities/mySql/userEntity");
const clientsEntity_1 = require("../entities/mySql/clientsEntity");
const clientsPhotoEntity_1 = require("../entities/mySql/clientsPhotoEntity");
exports.MySqlConfigObject = {
    type: 'mysql',
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || '',
    synchronize: true,
    logging: true,
    entities: [userEntity_1.User, clientsPhotoEntity_1.ClientPhotos, clientsEntity_1.Clients],
    migrationsTableName: 'migrations',
    migrations: ['TypeScriptFiles/MySQL/migrations/mySql/*.ts'],
};
exports.MysqlDataSource = new typeorm_1.DataSource({
    type: exports.MySqlConfigObject.type,
    host: exports.MySqlConfigObject.host,
    port: exports.MySqlConfigObject.port,
    username: exports.MySqlConfigObject.username,
    password: exports.MySqlConfigObject.password,
    database: exports.MySqlConfigObject.database,
    synchronize: exports.MySqlConfigObject.synchronize,
    logging: exports.MySqlConfigObject.logging,
    entities: exports.MySqlConfigObject.entities,
    migrationsTableName: exports.MySqlConfigObject.migrationsTableName,
    migrations: exports.MySqlConfigObject.migrations,
});
//# sourceMappingURL=mySqlOrmConfig.js.map