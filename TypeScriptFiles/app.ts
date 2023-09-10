import { mongoDatabaseCRUD_Ops } from './MongoDbControlCenter';

async function callAllOps() {
  try {
   await mongoDatabaseCRUD_Ops();
  } catch (error: any) {
    console.log('🚀 ~ file: app.ts:5 ~ error:', error.message);
  }
}

callAllOps();
