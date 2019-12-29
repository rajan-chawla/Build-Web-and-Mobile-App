const mysql = require('mysql');
const pool = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'H7j0c1CcvW',
    database: 'H7j0c1CcvW',
    password: 'aRxJAPoEX0',
    port: 3306
});
pool.connect((err) => {
  if (err) throw err;
  console.log('DB Connected!');
});

module.exports = pool;