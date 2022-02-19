const mysql = require('mysql2');
const dbConfig = require('../config/db.config.js');
const logger = require('../logger');

const connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  stringifyObjects: true,
});

connection.getConnection((err) => {
  if (err) {
    return logger.error(err);
  }
  logger.info('Connected to the MySQL server.');
});

module.exports = connection;
