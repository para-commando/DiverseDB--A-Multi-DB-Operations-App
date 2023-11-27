"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDataSource = void 0;
const typeorm_1 = require("typeorm");
require("dotenv/config");
exports.PostgresDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: ['TypeScriptFiles/MySQL/entities/postgres/*.ts'],
    migrationsTableName: 'migrations',
    migrations: ['TypeScriptFiles/MySQL/migrations/postgres/*.ts'],
});
//# sourceMappingURL=postgresOrmConfig.js.map