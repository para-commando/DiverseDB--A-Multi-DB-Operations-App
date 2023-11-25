import { getInitializedMySqlDataSource } from './dataSourceInitialization';
import { User } from '../../entities/mySql/entity';
import { MysqlDataSource } from '../../Configs/mySqlOrmConfig';
import { NotBrackets } from 'typeorm';
 
const queryOps = async () => {
  const initializedMySqlDataSource = await getInitializedMySqlDataSource();

  try {
    // running raw queries
    const rawData = await initializedMySqlDataSource.query(`INSERT INTO User (firstName, lastName, isActive) VALUES
    ('John', 'Doe', true),
    ('Alice', 'Smith', false),
    ('Bob', 'Johnson', true);`);
    console.log("🚀 ~ file: queryOps.ts:15 ~ queryOps ~ rawData:", rawData)
 
    const users = await initializedMySqlDataSource
      .createQueryBuilder()
      .select('*')
      .from(User, 'user')
      .where(`user.firstName = :name`, { name: 'John' })
      .execute();
    console.log("🚀 ~ file: queryOps.ts:23 ~ queryOps ~ users:", users)
 
    // SELECT * FROM `User` `user` WHERE `user`.`isActive`=true AND NOT((`user`.`firstName` = 'John' OR `user`.`lastName` = 'Doe'))

    const notUsers = await initializedMySqlDataSource
      .createQueryBuilder()
      .select('*')
      .from(User, 'user')
      .where(`user.isActive=:value1`, {value1:true})
    .andWhere(
        new NotBrackets((qb) => {
            qb.where("user.firstName = :value2", {
                value2: "John",
            }).orWhere("user.lastName = :value3", { value3: "Doe" })
        }),
    ).execute();
    console.log("🚀 ~ file: queryOps.ts:39 ~ queryOps ~ notUsers:", notUsers)

    const notUsers2 = await initializedMySqlDataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { firstName: 'Timber', lastName: 'Saw', isActive: true },
        { firstName: 'Phantom', lastName: 'Lancer', isActive: false },
      ])
      .execute();
    console.log("🚀 ~ file: queryOps.ts:50 ~ queryOps ~ notUsers2:", notUsers2)

   const oo =await  initializedMySqlDataSource
      .createQueryBuilder(User,'user')
      .where('user.firstName = :name', { name: 'John' })
      .getOne();
   console.log("🚀 ~ file: queryOps.ts:56 ~ queryOps ~ oo:", oo)

   const oo2 =await  initializedMySqlDataSource
   .createQueryBuilder(User,'user')
   .select('')
   .where('user.firstName = :name', { name: 'John' })
   .getMany();
   console.log("🚀 ~ file: queryOps.ts:63 ~ queryOps ~ oo2:", oo2)

   // Throws error when data is not found
   const oo3 =await  initializedMySqlDataSource
   .createQueryBuilder(User,'user')
   .select('user.id')
   .where('user.firstName = :name', { name: 'John' })
   .getOneOrFail();
   console.log("🚀 ~ file: queryOps.ts:71 ~ queryOps ~ oo3:", oo3)

  } catch (error) {
    console.log("🚀 ~ file: createOps.ts:72 ~ aa ~ error:", JSON.stringify(error))
    
  } finally {
    await initializedMySqlDataSource.destroy();
  }
};

queryOps();
