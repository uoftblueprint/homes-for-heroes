const sql = require('./db.js');
// const CustomerQueryData = require('./customer-query-data.model.js');
const CustomerProfile = require('./customer-profile.model');
const UserInfo = require('./userinfo.model');
const CustomerQueryData = require('./query-models/customer-query-data.model.js');
const bcrypt = require('bcrypt');

// constructor
const Customer = function (customer) {
  this.user_id = customer.user_id;
  this.name = customer.name;
  this.email = customer.email;
  this.password = customer.password;
  this.phone = customer.phone;
  this.role_id = customer.role_id;
  this.alert_case_id = customer.alert_case_id;
  this.verified = customer.verified;
  this.oauth = customer.oauth;
};

Customer.prototype.isValidPassword = async function (password) {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};

Customer.prototype.updateUserInfo = function(user_info) {
  return new Promise((resolve, reject) => {
    // Don't allow the user to change these params through this API
    user_info.user_id = this.user_id;
    user_info.email = this.email;
    user_info.applicant_phone = this.phone;
    const userInfo = new UserInfo(user_info);
    userInfo.update().then(resolve).catch(reject);
  });
};

Customer.prototype.changePassword = function(password) {
  return new Promise((resolve, reject) => {
    const hashedPassword = bcrypt.hashSync(password, 15);
    sql.query('UPDATE client_users SET password = ? WHERE user_id = ?',
      [hashedPassword, this.user_id],
      (err) => {
        if (err) reject(err);
        else resolve(true);
      });
  });
};

Customer.prototype.update = function(name, phone, email) {
  return new Promise((resolve, reject) => {
    sql.query('UPDATE client_users SET name = ?, phone = ?, email = ? WHERE user_id = ?',
      [name, phone, email, this.user_id],
      (err) => {
        if (err) reject(err);
        else resolve(true);
      });
  });
};

Customer.create = function (name, phone, email, password, role_id = 0, conn = null) {
  return new Promise((resolve, reject) => {
    let txn = true;
    if (conn === null) {
      conn = sql;
      txn = false;
    }
    const hashedPassword = bcrypt.hashSync(password, 15);
    conn.query(
      'INSERT INTO client_users (name, phone, email, password, role_id, verified, oauth) VALUES (?, ?, ?, ?, ?, FALSE, FALSE)',
      [name, phone, email, hashedPassword, role_id],
      (err, result) => {
        if (err) return txn ? conn.rollback(() => reject(err)) : reject(err);
        resolve(
          new Customer({
            user_id: result.insertId,
            name: name,
            email: email,
            phone: phone,
            verified: true,
            oauth: false,
          }),
        );
      });
  });
};

Customer.createTemp = function (name, email, role_id = 0, conn = null) {
  return new Promise((resolve, reject) => {
    let txn = true;
    if (conn === null) {
      conn = sql;
      txn = false;
    }
    conn.query(
      'INSERT INTO client_users (name, email, role_id, verified, oauth) VALUES (?, ?, ?, FALSE, FALSE)',
      [name, email, role_id],
      (err, result) => {
        if (err) return txn ? conn.rollback(() => reject(err)) : reject(err);
        resolve(
          new Customer({
            user_id: result.insertId,
            name: name,
            email: email,
            verified: false,
            oauth: false,
          }),
        );
      });
  });
};

Customer.createOAuth = function (name, email) {
  return new Promise((resolve, reject) => {
    sql.query(
      'INSERT INTO client_users (name, email, verified, oauth) VALUES (?, ?, TRUE, TRUE)',
      [name, email],
      (err, result) => {
        if (err) reject(err);
        else {
          if (err) return reject(err);
          resolve(
            new Customer({
              user_id: result.insertId,
              name: name,
              email: email,
              verified: true,
              oauth: true,
            }),
          );
        }
      },
    );
  });
};

Customer.verify = function (user_id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'UPDATE client_users SET verified = TRUE WHERE user_id = ?',
      [user_id],
      (err) => {
        if (err) reject(err);
        else resolve(true);
      },
    );
  });
};

Customer.getByEmail = function (email) {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT * FROM client_users WHERE email = ? LIMIT 1',
      [email],
      (err, rows) => {
        if (err) reject(err);
        else if (!rows[0]) reject(new Error('User not found'));
        else resolve(new Customer(rows[0]));
      },
    );
  });
};

Customer.getById = function (user_id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT * FROM client_users WHERE user_id = ? LIMIT 1',
      [user_id],
      (err, rows) => {
        if (err) reject(err);
        else if (!rows[0]) reject(new Error('User not found'));
        else resolve(new Customer(rows[0]));
      },
    );
  });
};

Customer.getCustomerInfo = function (user_id) {
  return new Promise((resolve, reject) => {
    const query = `SELECT c.name, c.email, c.phone, u.street_name, 
    u.city, u.province, u.applicant_dob 
    FROM client_users AS c INNER JOIN UserInfo AS u 
    ON c.user_id = u.user_id WHERE c.user_id = ?`;
    sql.query(query, [user_id], (err, userInfo) => {
      if (err) reject(err);
      else resolve(userInfo);
    });
  });
};

Customer.retrieveAll = function () {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * FROM client_users', (err, rows) => {
      if (err) reject(err);
      else {
        const customers = [];
        rows.forEach((row) => {
          delete row['password'];
          customers.push(new Customer(row));
        });
        resolve(customers);
      }
    });
  });
};

Customer.getAlertCaseId = function (user_id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT alert_case_id FROM client_users WHERE user_id = ?',
      [user_id],
      (err, rows) => {
        if (err) reject(err);
        else if (rows[0] === undefined) reject('User does not exist.');
        else resolve(rows[0].alert_case_id);
      },
    );
  });
};

Customer.getAlertCase = function (user_id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT cases.* FROM client_users INNER JOIN cases ON client_users.alert_case_id = cases.case_id WHERE client_users.user_id = ?',
      [user_id],
      (err, rows) => {
        if (err) reject(err);
        else if (rows[0] === undefined) reject('Alert note does not exist.');
        else resolve(rows[0]);
      },
    );
  });
};

Customer.setAlertCaseId = function (user_id, case_id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'UPDATE client_users SET alert_case_id = ? WHERE user_id = ?',
      [case_id, user_id],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows[0]);
      },
    );
  });
};

Customer.getCases = function (user_id, start_date, end_date) {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT * FROM cases WHERE user_id = ? AND date(last_update) BETWEEN ? AND ?',
      [user_id, start_date, end_date],
      (err, cases) => {
        if (err) reject(err);
        resolve(cases);
      },
    );
  });
};

Customer.getToDo = function(user_id) {
  return new Promise((resolve, reject) => {
    sql.query('SELECT todo FROM client_users WHERE user_id = ?', 
      [user_id],
      (err, cases) => {
        if (err) reject(err);
        resolve(cases);
      });
  });
};

Customer.updateToDo = function(user_id, todo) {
  return new Promise((resolve, reject) => {
    sql.query('UPDATE client_users SET todo = ? WHERE user_id = ?', 
      [todo, user_id],
      (err, cases) => {
        if (err) reject(err);
        resolve(cases);
      });
  });
};

Customer.queryUserData = function (query_params) {
  return new Promise((resolve, reject) => {
    const q = new CustomerQueryData(query_params);
    q.constructQuery();
    const page_query =`SELECT COUNT(*) AS count FROM client_users AS client 
     LEFT JOIN UserInfo AS info ON info.user_id = client.user_id
     LEFT JOIN NextKin AS kin ON kin.user_id = client.user_id
     ${q.query}`
    const data_query = ` 
    SELECT
      client.user_id, client.name, client.email, client.verified,
      info.gender, info.applicant_phone, info.applicant_dob, info.curr_level, info.city, info.province,
      kin.kin_name, kin.relationship, kin.kin_phone, kin.kin_email
    FROM client_users AS client
      LEFT JOIN UserInfo AS info ON info.user_id = client.user_id
      LEFT JOIN NextKin AS kin ON kin.user_id = client.user_id 
      ${q.query}
    ORDER BY client.name
    LIMIT ${q.offset}, ${q.limit}
    `;
    sql.query(page_query, (error, page) => { 
      if (error) reject(error);
      sql.query(data_query, (err, row) => {
        if (err) reject(err);
        resolve([page[0],row]);
      }); 
    });
  });
};

Customer.updateUserInfo = function (user_id, query_params) {
  return new Promise((resolve, reject) => {
    const q = new CustomerQueryData(query_params);
    q.constructEditQuery();
    const data_query = `   
    UPDATE client_users AS client
      LEFT JOIN UserInfo AS info ON info.user_id = client.user_id
      LEFT JOIN NextKin AS kin ON kin.user_id = client.user_id
    ${q.query}
    WHERE client.user_id = ${user_id} 
    `;
    sql.query(data_query, (error, info) => { 
      if (error) reject(error); 
      resolve(info);
    });
  });
};

Customer.updateProfile = function(user_id, body) {
  return new Promise((resolve, reject) => {
    //console.log(query_params);
    const cust = new CustomerProfile(user_id, body);
    const queries = cust.buildQueries();
    const qry = queries.join(';');
    // need to update client_users and UserInfo tables separately
    //sql_qry_c = 'UPDATE client_users SET phone = ? WHERE user_id = ?';
    sql.query(qry,
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
  });
};

Customer.updateProfile = function(user_id, body) {
  return new Promise((resolve, reject) => {
    //console.log(query_params);
    const cust = new CustomerProfile(user_id, body);
    const queries = cust.buildQueries();
    const qry = queries.join(';');
    // need to update client_users and UserInfo tables separately
    //sql_qry_c = 'UPDATE client_users SET phone = ? WHERE user_id = ?';
    sql.query(qry,
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
  });
};

Customer.deleteVeteran = function (user_id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'DELETE FROM client_users WHERE user_id = ? AND role_id = 0',
      [user_id],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows[0]);
      },
    );
  });
};

Customer.getCSV = function (query_params) {
  return new Promise((resolve, reject) => {
    const q = new CustomerQueryData(query_params);
    q.constructQuery();
    const data_query = ` 
    SELECT
      client.user_id, client.name, client.email, client.verified,
      info.gender, info.applicant_phone, info.applicant_dob, info.curr_level, info.city, info.province,
      kin.kin_name, kin.relationship, kin.kin_phone, kin.kin_email
    FROM client_users AS client
      LEFT JOIN UserInfo AS info ON info.user_id = client.user_id
      LEFT JOIN NextKin AS kin ON kin.user_id = client.user_id 
      ${q.query}
    ORDER BY client.name
    `;
    sql.query(data_query, (err, row) => {
      if (err) reject(err);
      resolve(row);
    }); 
  });
};

module.exports = Customer;
