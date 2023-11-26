import { getInitializedMySqlDataSource } from './dataSourceInitialization';
import { User } from '../../entities/mySql/userEntity';
import { MysqlDataSource } from '../../Configs/mySqlOrmConfig';
import { NotBrackets } from 'typeorm';
import { Clients } from '../../entities/mySql/clientsEntity';
import { ClientPhotos } from '../../entities/mySql/clientsPhotoEntity';
const queryOps = async () => {
  const initializedMySqlDataSource = await getInitializedMySqlDataSource();
  try {
    // running raw queries
    const rawQueryResult =
      await initializedMySqlDataSource.query(`INSERT INTO User (firstName, lastName, isActive) VALUES
    ('John', 'Doe', true),
    ('Alice', 'Smith', false),
    ('Bob', 'Johnson', true);`);
    console.log(
      '🚀 ~ file: queryOps.ts:15 ~ queryOps ~ rawQueryResult:',
      rawQueryResult
    );

    const readQueryBuilderType1 = await initializedMySqlDataSource
      .createQueryBuilder()
      .select('*')
      .from(User, 'user')
      .where(`user.firstName = :name`, { name: 'John' })
      .execute();
    console.log(
      '🚀 ~ file: queryOps.ts:23 ~ queryOps ~ readQueryBuilderType1:',
      readQueryBuilderType1
    );

    // SELECT * FROM `User` `user` WHERE `user`.`isActive`=true AND NOT((`user`.`firstName` = 'John' OR `user`.`lastName` = 'Doe'))

    const readQueryBuilderType2 = await initializedMySqlDataSource
      .createQueryBuilder()
      .select('*')
      .from(User, 'user')
      .where(`user.isActive=:value1`, { value1: true })
      .andWhere(
        new NotBrackets((qb) => {
          qb.where('user.firstName = :value2', {
            value2: 'John',
          }).orWhere('user.lastName = :value3', { value3: 'Doe' });
        })
      )
      .execute();
    console.log(
      '🚀 ~ file: queryOps.ts:39 ~ queryOps ~ readQueryBuilderType2:',
      readQueryBuilderType2
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
      '🚀 ~ file: queryOps.ts:50 ~ queryOps ~ insertQueryBuilderType1:',
      insertQueryBuilderType1
    );

    const readQueryBuilderType3 = await initializedMySqlDataSource
      .createQueryBuilder(User, 'user')
      .where('user.firstName = :name', { name: 'John' })
      .getOne();
    console.log(
      '🚀 ~ file: queryOps.ts:56 ~ queryOps ~ readQueryBuilderType3:',
      readQueryBuilderType3
    );

    const readQueryBuilderType4 = await initializedMySqlDataSource
      .createQueryBuilder(User, 'user')
      .select('')
      .where('user.firstName = :name', { name: 'John' })
      .getMany();
    console.log(
      '🚀 ~ file: queryOps.ts:63 ~ queryOps ~ readQueryBuilderType4:',
      readQueryBuilderType4
    );

    // Throws error when data is not found
    const readQueryBuilderType5 = await initializedMySqlDataSource
      .createQueryBuilder(User, 'user')
      .select('user.id')
      .where('user.firstName = :name', { name: 'John' })
      .getOneOrFail();
    console.log(
      '🚀 ~ file: queryOps.ts:71 ~ queryOps ~ readQueryBuilderType5:',
      readQueryBuilderType5
    );

    const readQueryBuilderType6 = await initializedMySqlDataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.firstName = :name', { name: 'John' })
      .getCount();
    console.log(
      '🚀 ~ file: queryOps.ts:101 ~ queryOps ~ readQueryBuilderType6:',
      readQueryBuilderType6
    );

    const readQueryBuilderType7 = await initializedMySqlDataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .distinctOn(['user.firstName'])
      .where('user.id IN (:...ids)', { ids: [1, 3, 4] })
      .orderBy('user.id', 'DESC')
      .execute();
    console.log(
      '🚀 ~ file: queryOps.ts:101 ~ queryOps ~ readQueryBuilderType7:',
      readQueryBuilderType7
    );

    const readQueryBuilderType8 = await initializedMySqlDataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .select('user.isActive')
      .where('', {})
      .groupBy('user.isActive')
      .execute();
    console.log(
      '🚀 ~ file: queryOps.ts:101 ~ queryOps ~ readQueryBuilderType8:',
      readQueryBuilderType8
    );

 
    const insertQueryBuilderClientsEntity = await initializedMySqlDataSource
    .createQueryBuilder()
    .insert()
    .into(Clients)
    .values([
      { name: 'Alason' },
      { name: 'Phantom' },
    ])
    .execute();
  console.log(
    '🚀 ~ file: queryOps.ts:50 ~ queryOps ~ insertQueryBuilderClientsEntity:',
    insertQueryBuilderClientsEntity
  );
  const insertQueryBuilderClientPhotoEntity = await initializedMySqlDataSource
    .createQueryBuilder()
    .insert()
    .into(ClientPhotos)
    .values([
      { url: 'AlasonCandid.jpg'},
      { url: 'PhantomCandid.jpg'},
    ])
    .execute();
  console.log(
    '🚀 ~ file: queryOps.ts:50 ~ queryOps ~ insertQueryBuilderClientPhotoEntity:',
    insertQueryBuilderClientPhotoEntity
  );
  } catch (error) {
    console.log(
      '🚀 ~ file: createOps.ts:72 ~ aa ~ error:',
      JSON.stringify(error)
    );
  } finally {
    await initializedMySqlDataSource.destroy();
  }
};

queryOps();
