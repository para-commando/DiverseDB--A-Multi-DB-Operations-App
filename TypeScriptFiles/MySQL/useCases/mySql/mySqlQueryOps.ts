import { createQueryOps } from './crudOps/createQueryOps';
import { readQueryOps } from './crudOps/readQueryOps';
import { updateQueryOps } from './crudOps/updateQueryOps';
import { deleteQueryOps } from './crudOps/deleteQueryOps';

export const mySqlQueryOps = async () => {
  try {
    console.log('\n\nstarting create Query Operations\n\n');
    await createQueryOps();
    console.log('\n\nEnded create Query Operations');

    console.log('\n\nstarting read Query Operations\n\n');
    await readQueryOps();
    console.log('\n\nEnded read Query Operations');

    console.log('\n\nstarting update Query Operations\n\n');
    await updateQueryOps();
    console.log('\n\nEnded update Query Operations');

    console.log('\n\nstarting delete Query Operations\n\n');
    await deleteQueryOps();
    console.log('\n\nEnded delete Query Operations');
  } catch (err) {
    console.log(
      '🚀 ~ file: mySqlQueryOps.ts:24 ~ mySqlQueryOps ~ err:',
      JSON.stringify(err)
    );
  }
};
