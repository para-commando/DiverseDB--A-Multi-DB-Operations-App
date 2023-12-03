import { getInitializedMySqlDataSource } from '../utils/dataSourceInitialization';
import { Clients } from '../../../entities/mySql/clientsEntity';
export const deleteQueryOps = async () => {
  const initializedMySqlDataSource = await getInitializedMySqlDataSource();
  try {
    // deleting using softDelete() is useful when the extra column @DeleteDateColumn() in the entity is been added. As the data deleted, only using softDelete() is stored in that column, and data deleted using rest of the methods is not stored in that column and hence cant be restored
    await initializedMySqlDataSource
      .getRepository(Clients)
      .createQueryBuilder()
      .softDelete()
      .where('name = :id', { id: 'Thuppan' })
      .execute();

    const users = await initializedMySqlDataSource
      .getRepository(Clients)
      .createQueryBuilder()
      .select()
      .withDeleted()
      .execute();
    console.log('🚀 ~ file: queryOps2.ts:59 ~ queryOps ~ users:', users);

    // restoring the data deleted using softDelete. When this is done the corresponding data stored in deletedAt column is made null
    await initializedMySqlDataSource
      .getRepository(Clients)
      .createQueryBuilder()
      .restore()
      .where('name = :id', { id: 'Thuppan' })
      .execute();
  } catch (error) {
    console.log('🚀 ~ file: queryOps.ts:166 ~ queryOps ~ error:', error);
    console.log(
      '🚀 ~ file: createOps.ts:72 ~ aa ~ error:',
      JSON.stringify(error)
    );
  } finally {
    await initializedMySqlDataSource.destroy();
  }
};
