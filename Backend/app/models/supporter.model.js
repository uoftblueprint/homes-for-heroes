const sql = require('./db.js');
const logger = require('../logger');

// constructor
const Supporter = function (body) {
  this.name = body.name;
  this.date_gifted = body.date_gifted;
  this.gift_provided = body.gift_provided;
  this.phone = body.phone;
};

// add new supporter
Supporter.prototype.create = function() {
  return new Promise((resolve, reject) => {
    sql.query('INSERT INTO supporters (name, date_gifted, gift_provided, phone) VALUES (?)',
      [[this.name, this.date_gifted, this.gift_provided, this.phone]],
      (err, results) => {
        if (err) reject (err);
        else resolve(results.insertId);
      });
  });
};

// list all supporters
Supporter.listAll = function () {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * FROM supporters', 
      (err, rows) => {
        if (err) reject (err);
        else {
          resolve(rows);
        }
      });
  });
};

module.exports = Supporter;