import { DataSource } from 'typeorm';
import 'dotenv/config';
import {User} from '../entities/mySql/entity'
export const MysqlDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,
  logging: true,
  entities: [User],
  migrationsTableName: 'migrations',
  migrations: ['TypeScriptFiles/MySQL/migrations/mySql/*.ts'],
});
