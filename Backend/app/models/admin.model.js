const sql = require('./db.js');
const logger = require('../logger');
const Customer = require('./customer.model');

// constructor
const Admin = function (admin) {
  this.user_id = admin.user_id;
  this.chapter_id = admin.chapter_id;
  this.role_id = admin.role_id || 1;
};

Admin.createTemp = function (name, email, chapter_id, role_id = 1, conn = null) {
  return new Promise((resolve, reject) => {
    let txn = true;
    if (conn === null) {
      conn = sql;
      txn = false;
    }
    conn.query(
      'INSERT INTO client_users (name, email, chapter_id, role_id, verified, oauth) VALUES (?, ?, ?, ?, FALSE, FALSE)',
      [name, email, chapter_id, role_id],
      (err, result) => {
        if (err) return txn ? conn.rollback(() => reject(err)) : reject(err);
        resolve(
          new Admin({
            user_id: result.insertId,
            chapter_id: chapter_id,
            role_id: role_id,
            email: email
          }),
        );
      });
  });
};


Admin.listAll = function () {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * FROM client_users where role_id = 2', (err, admins) => {
      if (err) reject(err);
      else {
        logger.debug('Admin.listAll: %o', admins);
        resolve(admins);
      }
    });
  });
};

Admin.listAllRole = function (role_id) {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * FROM client_users WHERE role_id = ?',
      [role_id],
      (err, admins) => {
        if (err) reject(err);
        else {
          logger.debug('Admin.listAllRole: %o, %d', admins, role_id);
          resolve(admins);
        }
      });
  });
};

Admin.getSearchAdmins = function (name) {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT * FROM client_users WHERE name LIKE ? AND role_id > 0',
      [`%${name}%`],
      (err, admins) => {
        if (err) reject(err);
        resolve(admins);
      },
    );
  });
};

Admin.makeSuperadmin = function (admin_id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'UPDATE client_users SET role_id = 2 WHERE user_id = ?',
      [admin_id],
      (err, rows) => {
        if (err) reject(err);
        else {
          sql.query(
            'UPDATE client_users SET chapter_id = NULL WHERE user_id = ?',
            [admin_id],
            (err, rows) => {
              if (err) reject(err);
              resolve(rows[0]);
            }
          );
        }
      }
    );
  });
};

Admin.unsetSuperadmin = function (admin_id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'UPDATE client_users SET role_id = 1 WHERE user_id = ?',
      [admin_id],
      (err, rows) => {
        if (err) reject(err);
        else {
          resolve(rows[0]);
        }
      }
    );
  });
};

Admin.deleteSupervisor = function (admin_id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'DELETE FROM client_users WHERE user_id = ?',
      [admin_id],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows[0]);
      },
    );
  });
};

Admin.assignChapter = function (admin_id, chapter_id) {
  logger.debug(admin_id);
  return new Promise((resolve, reject) => {
    sql.query(
      'UPDATE client_users SET chapter_id = ? WHERE user_id = ?',
      [chapter_id, admin_id],
      (err) => {
        if (err) reject(err);
        else {
          resolve(admin_id);
        }
      },
    );
  });
};

Admin.listByChapter = function(chapter_id) {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * FROM client_users WHERE role_id = 1 AND chapter_id = ?',
      [chapter_id], (err, supervisors) => {
        if (err) reject (err);
        else {
          resolve(supervisors);
        }
      });
  });
};


Admin.getRole = function (admin_id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT c.role_id FROM client_users AS c WHERE c.user_id = ?',
      [admin_id],
      (err, rows) => {
        if (err) reject(err);
        else {
          resolve(rows[0].role_id);
        }
      }
    );
  });
};

module.exports = Admin;
