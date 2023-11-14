const { createConnection } = require('typeorm');
require('dotenv').config();
const main = async () => {
  try {
    console.log("🚀 ~ file: connector.js:8 ~ main ~ process.env.MYSQL_HOST:", process.env.MYSQL_HOST)
    await createConnection({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
   

    console.log('Connected to MySQL server successfully');
  } catch (error) {
    console.log('🚀 ~ file: connector.ts:15 ~ main ~ error:', error);
    throw new Error('MySQL DB connection failed');
  }
};

main();
