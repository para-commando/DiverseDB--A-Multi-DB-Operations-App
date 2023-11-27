import { createConnection } from 'typeorm';
import 'dotenv/config';
import { Client } from './entities/postgres/client';
import { Clients } from './entities/mySql/clientsEntity';
import { ClientPhotos } from './entities/mySql/clientsPhotoEntity';
import { MySqlConfigObject } from './Configs/mySqlOrmConfig';
const main = async (): Promise<void> => {
  try {
    console.log(
      '🚀 ~ file: connector.ts:8 ~ main ~ process.env.MYSQL_HOST:',
      process.env.MYSQL_HOST
    );

    const connection = await createConnection(MySqlConfigObject);

    console.log('Connected to MySQL server successfully');
    await connection.close();
  } catch (error) {
    console.log('🚀 ~ file: connector.ts:15 ~ main ~ error:', error);
    throw new Error('MySQL DB connection failed');
  }
};

main();
