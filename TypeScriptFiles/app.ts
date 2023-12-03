import { mongoDatabaseCRUD_Ops } from './MONGODB/MongoDbControlCenter';
import { mySqlQueryOps } from './MySQL/useCases/mySql/mySqlQueryOps';
async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
async function callAllOps() {
  try {
  console.log('\n\n🍃 🍃 🍃 🍃 Starting MongoDB operations 🍃 🍃 🍃 🍃\n\n');
    await mongoDatabaseCRUD_Ops();
    console.log('\n\n🍃 🍃 🍃 🍃 MongoDB operations Complete 🍃 🍃 🍃 🍃');

    await sleep(5000);

    console.log('\n\n🐬 🐬 🐬 🐬 Starting MySQL operations 🐬 🐬 🐬 🐬');
    await mySqlQueryOps();
    console.log('\n\n🐬 🐬 🐬 🐬 MySQL operations Complete 🐬 🐬 🐬 🐬');
  } catch (error: any) {
    console.log('🚀 ~ file: app.ts:5 ~ error:', error.message);
  }
}

callAllOps();
