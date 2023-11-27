import { createConnection } from 'typeorm';
import { MySqlConfigObject } from '../Configs/mySqlOrmConfig';

export const createTableForMySqlEntity = async () => {
  
  const connection = await createConnection(MySqlConfigObject).catch(
    (error) => {
      console.log(
        '🚀 ~ file: createTablesFromMySqlEntity.ts:11 ~ connection ~ error:',
        error
      );
      throw new Error('Error while creating a connection');
    }
  );
  try {
    console.log(`Successfully synchronized tables for all the entities`);
  } catch (e) {
    console.log(
      '🚀 ~ file: createTablesFromMySqlEntity.ts:14 ~ createTableForMySqlEntity ~ e:',
      e
    );

    throw new Error('Failed to create table for an entity');
  } finally {
    connection.close();
  }
};
