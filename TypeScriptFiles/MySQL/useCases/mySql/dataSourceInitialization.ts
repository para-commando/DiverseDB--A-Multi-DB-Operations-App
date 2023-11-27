import { MysqlDataSource } from '../../Configs/mySqlOrmConfig';

export const getInitializedMySqlDataSource = async () => {
  try {
    await MysqlDataSource.initialize();
    const isMySqlDataSourceInitialized: boolean = MysqlDataSource.isInitialized;

    if (isMySqlDataSourceInitialized) {
      console.log('MySqlDataSource Initialized successfully..');
    } else {
      throw new Error('MySqlDataSource initialization failed');
    }
  } catch (err) {
    console.log(
      '🚀 ~ file: dbOps.ts:14 ~ initializedMysqlDataSource ~ err:',
      err
    );

    throw err;
  }
  return MysqlDataSource
};
