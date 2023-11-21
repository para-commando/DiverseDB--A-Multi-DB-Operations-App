import { DataSource } from 'typeorm';
import 'dotenv/config';

export const MysqlDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrationsTableName: 'migrations',
  migrations: ['TypeScriptFiles/MySQL/migrations/mySql/*.ts'],
});
