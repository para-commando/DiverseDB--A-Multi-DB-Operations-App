import { getInitializedMySqlDataSource } from '../utils/dataSourceInitialization';
import { Clients } from '../../../entities/mySql/clientsEntity';
export const updateQueryOps = async () => {
  const initializedMySqlDataSource = await getInitializedMySqlDataSource();
  try {
    // update query
    const updateQueryResult = await initializedMySqlDataSource
      .createQueryBuilder()
      .update(Clients)
      .set({
        name: 'Timber',
      })
      .where('id = :id', { id: 1 })
      .execute();
    console.log(
      '🚀 ~ file: updateQueryOps.ts:19 ~ updateQueryOps ~ updateQueryResult:',
      updateQueryResult
    );
  } catch (error) {
    console.log(
      '🚀 ~ file: updateQueryOps.ts:21 ~ updateQueryOps ~ error:',
      JSON.stringify(error)
    );
  } finally {
    await initializedMySqlDataSource.destroy();
  }
};
