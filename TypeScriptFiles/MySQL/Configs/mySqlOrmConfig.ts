import { DataSource, EntitySchema } from 'typeorm';
import 'dotenv/config';
import { User } from '../entities/mySql/userEntity';
import { Clients } from '../entities/mySql/clientsEntity';
import { ClientPhotos } from '../entities/mySql/clientsPhotoEntity';

export interface MySqlConfigObjectType {
  type: 'mysql' | 'mariadb' | 'postgres'; // Use the enum for database types
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean; // Use the enum for logging levels
  entities: (string | Function | EntitySchema<any>)[];
  migrationsTableName: string;
  migrations: string[];
}

export const MySqlConfigObject: MySqlConfigObjectType = {
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || '',
  synchronize: true,
  logging: false,
  entities: [Clients,ClientPhotos, User],
  migrationsTableName: 'migrations',
  migrations: ['TypeScriptFiles/MySQL/migrations/mySql/*.ts'],
};
export const MysqlDataSource = new DataSource({
  type: MySqlConfigObject.type,
  host: MySqlConfigObject.host,
  port: MySqlConfigObject.port,
  username: MySqlConfigObject.username,
  password: MySqlConfigObject.password,
  database: MySqlConfigObject.database,
  synchronize: MySqlConfigObject.synchronize,
  logging: MySqlConfigObject.logging,
  entities: MySqlConfigObject.entities,
  migrationsTableName: MySqlConfigObject.migrationsTableName,
  migrations: MySqlConfigObject.migrations,
});
