const sql = require("./db.js");
const logger = require("../logger");

const Volunteer = function (body) {
  this.name = body.name;
  this.village = body.village;
  this.date_joined = body.date_joined;
  this.role = body.role;
  this.phone = body.phone;
};

// add new volunteer
Volunteer.prototype.create = function () {
  return new Promise((resolve, reject) => {
    sql.query(
      "INSERT INTO volunteers (name, village, date_joined, role, phone) VALUES (?)",
      [[this.name, this.village, this.date_joined, this.role, this.phone]],
      function (err, results) {
        if (err) reject(err);
        else resolve(results.insertId);
      }
    );
  });
};

// list all volunteers
Volunteer.listAll = function () {
  return new Promise(function (resolve, reject) {
    sql.query("SELECT * FROM volunteers", function (err, rows) {
      if (err) reject(err);
      else {
        resolve(rows);
      }
    });
  });
};

// modify existing information of a volunteer
Volunteer.updateInfo = function(volunteer_id, body) {
  return new Promise((resolve, reject) => {
    sql.query("UPDATE volunteers SET name = ?, village = ?, date_joined = ?, role = ?, phone = ? WHERE volunteer_id = ?",
    [body.name, body.village, body.date_joined, body.role, body.phone, volunteer_id],
    function (err, results) {
      if (err) reject(err);
      else resolve(volunteer_id);
    });
  });
};

// search for and list a specific volunteer
Volunteer.getVolunteer = function (volunteer_name) {
  return new Promise((resolve, reject) => {
    sql.query(
      "SELECT * FROM volunteers WHERE name = ? LIMIT 1",
      [volunteer_name],
      (err, rows) => {
        if (err) reject(err);
        else if (!rows[0]) reject(new Error("Volunteer not found"));
        else resolve(rows[0]);
      }
    );
  });
};

module.exports = Volunteer;