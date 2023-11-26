import { createConnection, Entity } from 'typeorm';
import { MySqlConfigObject, MysqlDataSource } from '../Configs/mySqlOrmConfig';
import { getInitializedMySqlDataSource } from '../useCases/mySql/dataSourceInitialization';
export const createTableForMySqlEntity = async (entity: any) => {
  try {
    const initializedMySqlDataSource = await getInitializedMySqlDataSource();
    console.log("🚀 ~ file: createTablesFromMySqlEntity.ts:9 ~ createTableForMySqlEntity ~ initializedMySqlDataSource.hasMetadata(entity):", initializedMySqlDataSource.hasMetadata(entity))
    if (initializedMySqlDataSource.hasMetadata(entity))
     
      console.log('asfdffffffff');
    const userMetadata = initializedMySqlDataSource.getMetadata(entity);
    console.log(
      '🚀 ~ file: createTablesFromMySqlEntity.ts:8 ~ createTableForMySqlEntity ~ userMetadata:',
      userMetadata
    );
    await createConnection(MySqlConfigObject);
  } catch (e) {
    console.log(
      '🚀 ~ file: createTablesFromMySqlEntity.ts:14 ~ createTableForMySqlEntity ~ e:',
      e
    );

    throw new Error('Failed to create table for Entity');
  }
};
