import { createTableForMySqlEntity } from '../../utilities/createTablesFromMySqlEntity';
import { Usera } from '../../entities/mySql/aaa';
import * as fs from 'fs';
import * as path from 'path';

const entitiesDirectory = '../../entities/mySql/';

const aoo = async () => {
//   const entities = fs
//     .readdirSync(entitiesDirectory)
//     .filter((file) => file.endsWith('.js'))
//     .map((file) => import(path.join(entitiesDirectory, file)));
//   console.log('🚀 ~ file: createEntityTable.ts:12 ~ entities:', entities);
//   const aa = await Promise.all(entities);
//   aa.forEach(async (ele) => {
//     await createTableForMySqlEntity(ele);
//   });
  await createTableForMySqlEntity(Usera);
//   console.log('🚀 ~ file: createEntityTable.ts:14 ~ aoo ~ aa:', aa);
};
aoo();
// createTableForMySqlEntity()
