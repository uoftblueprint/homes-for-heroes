const sql = require('./db.js');

const Volunteer = function (body) {
  this.name = body.name;
  this.village = body.village;
  this.date_joined = body.date_joined;
  this.role = body.role;
  this.phone = body.phone;
};

// add new volunteer
Volunteer.prototype.create = function() {
  return new Promise((resolve, reject) => {
    sql.query('INSERT INTO volunteers (name, village, date_joined, role, phone) VALUES (?, ?, ?, ?, ?)',
      [this.name, this.village, this.date_joined, this.role, this.phone],
      (err, results) => {
        if (err) reject (err);
        else resolve(results.insertId);
      });
  });
};

// list all volunteers
Volunteer.listAll = function () {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * FROM volunteers', 
      (err, rows) => {
        if (err) reject (err);
        else {
          resolve(rows);
        }
      });
  });
};

module.exports = Volunteer;