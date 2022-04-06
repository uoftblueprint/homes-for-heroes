const sql = require("./db.js");
const logger = require("../logger");

// constructor for partners
const Partner = function (body) {
  this.name = body.name;
  this.city = body.city;
  this.village = body.village;
  this.address = body.address;
  this.phone = body.phone;
  this.email = body.email;
};

// add new partner
Partner.prototype.create = function () {
  return new Promise((resolve, reject) => {
    sql.query(
      "INSERT INTO partners (org_name, city, village, address, phone, email) VALUES (?)",
      [[this.name, this.city, this.village, this.address, this.phone, this.email]],
      function (err, results) {
        if (err) reject(err);
        else resolve(results.insertId);
      }
    );
  });
};

// modify existing information of a partner
Partner.updateInfo = function(user_id, body) {
  return new Promise((resolve, reject) => {
    sql.query("UPDATE partners SET org_name = ?, city = ?, village = ?, address = ?, phone = ?, email = ? WHERE partner_id = ?",
    [body.name, body.city, body.village, body.address, body.phone, body.email, user_id],
    function (err, results) {
      if (err) reject(err);
      else resolve(user_id);
    });
  });
};

// list all partners
Partner.listAll = function () {
  return new Promise(function (resolve, reject) {
    sql.query("SELECT * FROM partners", function (err, rows) {
      if (err) reject(err);
      else {
        resolve(rows);
      }
    });
  });
};

// search for and list a specific partner
Partner.getPartner = function (partner_name) {
  return new Promise((resolve, reject) => {
    sql.query(
      "SELECT * FROM partners WHERE org_name = ? LIMIT 1",
      [partner_name],
      (err, rows) => {
        if (err) reject(err);
        else if (!rows[0]) reject(new Error("Partner not found"));
        else resolve(rows[0]);
      }
    );
  });
};

module.exports = Partner;