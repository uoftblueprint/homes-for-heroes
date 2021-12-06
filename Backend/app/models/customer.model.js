const sql = require('./db.js');

// constructor
const Customer = function (customer) {
  this.user_id = customer.user_id;
  this.name = customer.name;
  this.email = customer.email;
  this.phone = customer.phone;
  this.alert_case_id = customer.alert_case_id;
};

Customer.retrieveAll = function () {
  return new Promise(function (resolve, reject) {
    sql.query('SELECT * FROM client_users', function (err, rows) {
      if (err) reject(err);
      else {
        const customers = [];
        rows.forEach(row => {
          customers.push(new Customer(row));
        });
        resolve(customers);
      }
    });
  });
};

Customer.getAlertCaseId = function (user_id) {
  return new Promise(function (resolve, reject) {
    sql.query(
      'SELECT alert_case_id FROM client_users WHERE user_id = ?',
      [user_id],
      function (err, rows) {
        if (err) reject(err);
        else if (rows[0] === undefined) reject('User does not exist.');
        else resolve(rows[0].alert_case_id);
      }
    );
  });
};

Customer.getAlertCase = function (user_id) {
  return new Promise(function (resolve, reject) {
    sql.query(
      'SELECT cases.* FROM client_users INNER JOIN cases ON client_users.alert_case_id = cases.case_id WHERE client_users.user_id = ?',
      [user_id],
      function (err, rows) {
        if (err) reject(err);
        else if (rows[0] === undefined) reject('Alert note does not exist.');
        else resolve(rows[0]);
      }
    );
  });
};

Customer.setAlertCaseId = function (user_id, case_id) {
  return new Promise(function (resolve, reject) {
    sql.query(
      'UPDATE client_users SET alert_case_id = ? WHERE user_id = ?',
      [case_id, user_id],
      function (err, rows) {
        if (err) reject(err);
        else resolve(rows[0]);
      }
    );
  });
};

Customer.getCases = function(user_id, start_date, end_date) {
  return new Promise((resolve, reject) => {
      sql.query("SELECT * FROM cases WHERE user_id = ? AND date(last_update) between ? and ?", 
      [user_id, start_date, end_date],
      function(err, cases) {
          if (err) reject(err);
          resolve(cases);
      });
  });
};


Customer.getUserInfoCSV = function(client_name, email, phone, street_name, kin_name) {
  return new Promise((resolve, reject) => {
    var conditions = [];
    var fields = [];
    if (client_name) { conditions.push(`c.name = ?`); fields.push(client_name); }
    if (email) { conditions.push(`c.email = ?`); fields.push(email); }
    if (phone) { conditions.push(`u.applicant_phone = ?`); fields.push(phone); }
    if (street_name) { conditions.push(`u.street_name = ?`); fields.push(street_name); }
    if (kin_name) { conditions.push(`k.kin_name = ?`); fields.push(kin_name); }
    var sql_query = `SELECT c.name, c.email,
      u.gender, u.applicant_phone, u.applicant_dob, u.street_name, u.curr_level, u.city, u.province,
      k.kin_name, k.relationship, k.kin_phone, k.kin_email
    FROM client_users AS c
      LEFT JOIN UserInfo AS u ON u.user_id = c.user_id
      LEFT JOIN NextKin AS k ON k.user_id = c.user_id ` + (conditions.length ? ("WHERE " + conditions.join( "AND ")) : "");
    sql.query(sql_query, fields, function(err, info) {
        if (err) reject(err);
        resolve(info);
      });
  });
};

module.exports = Customer;
