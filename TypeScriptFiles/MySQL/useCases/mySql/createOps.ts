import { getInitializedMySqlDataSource } from './dataSourceInitialization';

const aa = async () => {
  const aaa = await getInitializedMySqlDataSource();
  const rawData = await aaa.query(`INSERT INTO User (firstName, lastName, isActive) VALUES
  ('John', 'Doe', true),
  ('Alice', 'Smith', false),
  ('Bob', 'Johnson', true);`);
  console.log("🚀 ~ file: createOps.ts:9 ~ aa ~ rawData:", rawData)
};

aa();