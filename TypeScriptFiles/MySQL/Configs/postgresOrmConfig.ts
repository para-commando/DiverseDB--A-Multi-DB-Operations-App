import { DataSource } from 'typeorm';
import 'dotenv/config';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username:process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['src/**/*.entity.ts'],
  migrationsTableName: 'migrations',
  migrations: ['TypeScriptFiles/MySQL/migrations/postgres/*.ts'],
});
