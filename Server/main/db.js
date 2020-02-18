// MySql Database is used to host data in the application

const mysql = require('mysql');
const pool = mysql.createConnection({
  host: 'hsfuldadb.cozmwt08eve1.us-east-1.rds.amazonaws.com',
  user: 'admin',
  database: 'hsfuldadb',
  password: 'root1234',
  port: 3306
});
pool.connect((err) => {
  if (err) throw err;
  console.log('DB Connected!');
});

module.exports = pool;