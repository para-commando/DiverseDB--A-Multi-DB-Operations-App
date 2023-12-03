import { getInitializedMySqlDataSource } from '../utils/dataSourceInitialization';
import { User } from '../../../entities/mySql/userEntity';
import { NotBrackets } from 'typeorm';
import { Clients } from '../../../entities/mySql/clientsEntity';
import { ClientPhotos } from '../../../entities/mySql/clientsPhotoEntity';
export const readQueryOps = async () => {
  const initializedMySqlDataSource = await getInitializedMySqlDataSource();
  try {
    const readQueryBuilderType1 = await initializedMySqlDataSource
      .createQueryBuilder()
      .select('*')
      .from(User, 'user')
      .where(`user.firstName = :name`, { name: 'John' })
      .execute();
    console.log(
      '🚀 ~ file: readQueryOps.ts:16 ~ readQueryOps ~ readQueryBuilderType1:',
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
      '🚀 ~ file: readQueryOps.ts:36 ~ readQueryOps ~ readQueryBuilderType2:',
      readQueryBuilderType2
    );

    const readQueryBuilderType3 = await initializedMySqlDataSource
      .createQueryBuilder(User, 'user')
      .where('user.firstName = :name', { name: 'John' })
      .getOne();
    console.log(
      '🚀 ~ file: readQueryOps.ts:45 ~ readQueryOps ~ readQueryBuilderType3:',
      readQueryBuilderType3
    );

    const readQueryBuilderType4 = await initializedMySqlDataSource
      .createQueryBuilder(User, 'user')
      .select('')
      .where('user.firstName = :name', { name: 'John' })
      .getMany();
    console.log(
      '🚀 ~ file: readQueryOps.ts:55 ~ readQueryOps ~ readQueryBuilderType4:',
      readQueryBuilderType4
    );

    // Throws error when data is not found
    const readQueryBuilderType5 = await initializedMySqlDataSource
      .createQueryBuilder(User, 'user')
      .select('user.id')
      .where('user.firstName = :name', { name: 'John' })
      .getOneOrFail();
    console.log(
      '🚀 ~ file: readQueryOps.ts:66 ~ readQueryOps ~ readQueryBuilderType5:',
      readQueryBuilderType5
    );

    const readQueryBuilderType6 = await initializedMySqlDataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.firstName = :name', { name: 'John' })
      .getCount();
    console.log(
      '🚀 ~ file: readQueryOps.ts:76 ~ readQueryOps ~ readQueryBuilderType6:',
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
      '🚀 ~ file: readQueryOps.ts:88 ~ readQueryOps ~ readQueryBuilderType7:',
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
      '🚀 ~ file: readQueryOps.ts:100 ~ readQueryOps ~ readQueryBuilderType8:',
      readQueryBuilderType8
    );

    // left join where all the details are of the entity ClientPhotos are listed along with its corresponding joined data from Clients entity
    const leftJoinOnClientPhotos = await initializedMySqlDataSource
      .createQueryBuilder(ClientPhotos, 'clientpics')
      .leftJoinAndSelect('clientpics.client', 'photo')
      .getMany();
    console.log(
      '🚀 ~ file: readQueryOps.ts:110 ~ readQueryOps ~ leftJoinOnClientPhotos:',
      leftJoinOnClientPhotos
    );

    // left join where all the details are of the entity Clients are listed along with its corresponding joined data from ClientPhotos entity
    const leftJoinOnClients = await initializedMySqlDataSource
      .createQueryBuilder(Clients, 'client')
      .leftJoinAndSelect('client.photos', 'photo')
      .getMany();
    console.log(
      '🚀 ~ file: readQueryOps.ts:121 ~ readQueryOps ~ leftJoinOnClients:',
      leftJoinOnClients
    );

    const innerJoinOnClients = await initializedMySqlDataSource
      .createQueryBuilder(Clients, 'client')
      .innerJoinAndSelect('client.photos', 'photo')
      .getMany();
    console.log(
      '🚀 ~ file: readQueryOps.ts:129 ~ readQueryOps ~ innerJoinOnClients:',
      innerJoinOnClients
    );

    const conditionalLeftJoinOnClientPhotosV1 = await initializedMySqlDataSource
      .createQueryBuilder(ClientPhotos, 'clientpics')
      .leftJoinAndSelect('clientpics.client', 'photo') // Join with the alias "clientpics"
      .where('clientpics.url = :name', { name: 'AlasonCandid.jpg' }) // Corrected alias to "photo"
      .getMany();
    console.log(
      '🚀 ~ file: readQueryOps.ts:139 ~ readQueryOps ~ conditionalLeftJoinOnClientPhotosV1:',
      conditionalLeftJoinOnClientPhotosV1
    );

    // if want to use where on entity ClientPhotos then use 'clientpics' else if want to use on Clients then use 'client'  as the line leftJoinAndSelect says that join on the column client as it is decided as the point of join in the entity design
    const conditionalLeftJoinOnClientPhotosV2 = await initializedMySqlDataSource
      .createQueryBuilder(ClientPhotos, 'clientpics')
      .leftJoinAndSelect('clientpics.client', 'client') // Join with the alias "clientpics"
      .where('client.name = :name', { name: 'Alason' }) // Corrected alias to "photo"
      .getMany();
    console.log(
      '🚀 ~ file: readQueryOps.ts:151 ~ readQueryOps ~ conditionalLeftJoinOnClientPhotosV2:',
      conditionalLeftJoinOnClientPhotosV2
    );

    // here all the data from clientPhotos is listed and only those data is joined from client table which satisfies the given additional condition 'clientpics.url=:urlValue', here more than one condition is specified for joining itself and not in where clause
    const conditionalLeftJoinOnClientPhotosV3 = await initializedMySqlDataSource
      .createQueryBuilder(ClientPhotos, 'clientpics')
      .leftJoinAndSelect('clientpics.client', 'client') // Join with the alias "clientpics"
      .where('client.name=:nameValue', { nameValue: 'Alason' })
      .getMany();
    console.log(
      '🚀 ~ file: readQueryOps.ts:163 ~ readQueryOps ~ conditionalLeftJoinOnClientPhotosV3:',
      conditionalLeftJoinOnClientPhotosV3
    );

    // skips first 4 and takes next 2
    const leftJoinOnClients2 = await initializedMySqlDataSource
      .createQueryBuilder(Clients, 'client')
      .leftJoinAndSelect('client.photos', 'photo')
      .skip(4)
      .take(2)
      .maxExecutionTime(1000) // milliseconds.
      .getMany();
    console.log(
      '🚀 ~ file: readQueryOps.ts:178 ~ readQueryOps ~ leftJoinOnClients2:',
      leftJoinOnClients2
    );

    // setting locks: Sets the lock mode to "pessimistic_write." This means that when the query is executed, it will attempt to acquire a write lock on the selected rows, preventing other transactions from writing to those rows until the lock is released.
    // concepts: PESSIMISTIC_READ: you obtain a lock on the record at the start of the transaction, for the purpose of reading only. Basically you're saying "I don't want anyone updating this record while I'm reading it, but I don't mind others reading it as well". That means people also attempting a PESSIMISTIC_READ will succeed, but those attempting a PESSIMISTIC_WRITE will fail

    // concepts: PESSIMISTIC_WRITE: you obtain a lock on the record at the start of the transaction, for the purpose of writing. What you're saying is "I'm going to be updating this record, so no one can read or write to it until I'm done". That means both those attempting a PESSIMISTIC_READ or PESSIMISTIC_WRITE will fail

    const leftJoinOnClients3 = await initializedMySqlDataSource
      .createQueryBuilder(Clients, 'client')
      .leftJoinAndSelect('client.photos', 'photo')
      .skip(4)
      .take(2)
      .setLock('pessimistic_write')
      .getMany()
      .catch((error) => {
        console.log(error.message);
      });
    console.log(
      '🚀 ~ file: readQueryOps.ts:198 ~ readQueryOps ~ leftJoinOnClients3:',
      leftJoinOnClients3
    );
  } catch (error) {
    console.log(
      '🚀 ~ file: readQueryOps.ts:205 ~ readQueryOps ~ error:',
      JSON.stringify(error)
    );
  } finally {
    await initializedMySqlDataSource.destroy();
  }
};
