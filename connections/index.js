const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DBConnect = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD,
  );
  
  mongoose
    .connect(DBConnect)
    .then(() => {
      console.log('資料庫連線成功');
    })
    .catch((error) => {
      console.log('資料庫連線失敗');
    });