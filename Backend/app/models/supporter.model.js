const sql = require('./db.js');

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
    sql.query('INSERT INTO supporters (name, date_gifted, gift_provided, phone) VALUES (?, ?, ?, ?)',
      [this.name, this.date_gifted, this.gift_provided, this.phone],
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

// search for and list a specific supporter
Supporter.getSupporter = function (supporter_name) {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT * FROM supporters WHERE name = ? LIMIT 1',
      [supporter_name],
      (err, rows) => {
        if (err) reject(err);
        else if (!rows[0]) reject(new Error('Supporter not found'));
        else resolve(new Supporter(rows[0]));
      }
    );
  });
};

// modify existing information of a supporter
Supporter.updateInfo = function (supporter_id, body) {
  return new Promise((resolve, reject) => {
    sql.query(
      'UPDATE supporters SET name = ?, date_gifted = ?, gift_provided = ?, phone = ? WHERE supporter_id = ?',
      [
        body.name,
        body.date_gifted,
        body.gift_provided,
        body.phone,
        supporter_id,
      ],
      (err, results) => {
        if (err) reject(err);
        else resolve(supporter_id);
      }
    );
  });
};

module.exports = Supporter;
