const mysql = require('mysql2');
const dbConfig = require('../config/db.config.js');
const loggger = require('../logger');

const connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

connection.getConnection(function (err) {
  if (err) {
    return loggger.error(err);
  }
  loggger.info('Connected to the MySQL server.');
});

module.exports = connection;
