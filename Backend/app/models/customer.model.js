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
      'SELECT cases.* FROM client_users INNER JOIN cases ON client_users.alert_case_id = cases.case_id WHERE client_users.user_id = ?'
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

module.exports = Customer;
