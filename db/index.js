const mysql = require('mysql');

require('dotenv').config({ path: __dirname + '/.env' });

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

const runQuery = async (con, sql) => {
  //   return await con.query(sql, (err, res) => {
  //     if (err) throw err;
  //     return res;
  //   });

  return new Promise((resolve, reject) => {
    con.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        reject(new Error(`Error performing query ${sql}`));
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = { connection, runQuery };
