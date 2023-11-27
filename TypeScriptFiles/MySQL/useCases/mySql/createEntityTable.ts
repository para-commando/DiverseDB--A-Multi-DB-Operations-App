import { createTableForMySqlEntity } from '../../utilities/createTablesFromMySqlEntity';

const createEntityTables = async () => {
  await createTableForMySqlEntity().catch((e) => {
    console.log(
      '🚀 ~ file: createEntityTable.ts:5 ~ createEntityTables ~ e:',
      e
    );
    throw e;
  });
};
createEntityTables();
