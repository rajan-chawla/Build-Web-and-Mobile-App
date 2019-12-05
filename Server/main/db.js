const mysql = require('mysql');
const pool = mysql.createConnection({
    host: 'awsbwmadb.cwgzgqbdpoif.us-east-1.rds.amazonaws.com',
    user: 'AwsBwmaDb',
    database: 'mysql',
    password: 'AwsBwmaDb123',
    port: 3306
});
pool.connect((err) => {
  if (err) throw err;
  console.log('DB Connected!');
});

module.exports = pool;