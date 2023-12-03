import { getInitializedMySqlDataSource } from '../utils/dataSourceInitialization';
import { User } from '../../../entities/mySql/userEntity';
import { Clients } from '../../../entities/mySql/clientsEntity';
import { ClientPhotos } from '../../../entities/mySql/clientsPhotoEntity';
export const createQueryOps = async () => {
  const initializedMySqlDataSource = await getInitializedMySqlDataSource();
  try {
    // running raw queries
    const rawQueryResult =
      await initializedMySqlDataSource.query(`INSERT INTO User (firstName, lastName, isActive) VALUES
      ('John', 'Doe', true),
      ('Alice', 'Smith', false),
      ('Bob', 'Johnson', true);`);
    console.log(
      '🚀 ~ file: createQueryOps.ts:15 ~ createQueryOps ~ rawQueryResult:',
      rawQueryResult
    );

    const insertQueryBuilderType1 = await initializedMySqlDataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { firstName: 'Timber', lastName: 'Saw', isActive: true },
        { firstName: 'Phantom', lastName: 'Lancer', isActive: false },
      ])
      .execute();
    console.log(
      '🚀 ~ file: createQueryOps.ts:50 ~ createQueryOps ~ insertQueryBuilderType1:',
      insertQueryBuilderType1
    );

    const insertQueryBuilderClientsEntity = await initializedMySqlDataSource
      .createQueryBuilder()
      .insert()
      .into(Clients)
      .values([{ name: 'Alason' }, { name: 'Phantom' }])
      .execute();
    console.log(
      '🚀 ~ file: createQueryOps.ts:50 ~ createQueryOps ~ insertQueryBuilderClientsEntity:',
      insertQueryBuilderClientsEntity
    );
    const insertQueryBuilderClientPhotoEntity = await initializedMySqlDataSource
      .createQueryBuilder()
      .insert()
      .into(ClientPhotos)
      .values([
        { url: 'AlasonCandid.jpg', clientID: 1 },
        { url: 'PhantomCandid.jpg', clientID: 2 },
      ])
      .execute();
    console.log(
      '🚀 ~ file: createQueryOps.ts:50 ~ createQueryOps ~ insertQueryBuilderClientPhotoEntity:',
      insertQueryBuilderClientPhotoEntity
    );

    const upsertQuery = await initializedMySqlDataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        firstName: 'Timber',
        lastName: 'Pipes',
        isActive: false,
      })
      .orUpdate(['firstName', 'lastName'], ['isActive'])
      .execute();
    console.log(
      '🚀 ~ file: queryOps2.ts:100 ~ queryOps ~ upsertQuery:',
      upsertQuery
    );
  } catch (error) {
    console.log(
      '🚀 ~ file: createQueryOps.ts:59 ~ createQueryOps ~ error:',
      JSON.stringify(error)
    );
  } finally {
    await initializedMySqlDataSource.destroy();
  }
};
