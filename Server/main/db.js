const mysql = require('mysql');
const pool = mysql.createConnection({
    host: 'hsfuldadbinstance.cwgzgqbdpoif.us-east-1.rds.amazonaws.com',
    user: 'hsfulda',
    database: 'mysql',
    password: 'hsfulda123',
    port: 3306
});
pool.connect((err) => {
  if (err) throw err;
  console.log('DB Connected!');
});

module.exports = pool;