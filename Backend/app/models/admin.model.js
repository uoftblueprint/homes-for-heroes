const sql = require('./db.js');
const logger = require('../logger');

// constructor
const Admin = function (body) {
  this.name = body.name;
  this.role_id = 0; // 0 by default
};

Admin.listAll = function () {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * FROM admin_users', (err, admins) => {
      if (err) reject(err);
      else {
        resolve(admins);
      }
    });
  });
};

Admin.getSearchAdmins = function (name) {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT * FROM admin_users WHERE name LIKE ?',
      [`%${name}%`],
      (err, admins) => {
        if (err) reject(err);
        resolve(admins);
      },
    );
  });
};

Admin.makeSupervisor = function (admin_id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'UPDATE admin_users SET role_id = 2 WHERE admin_id = ?',
      [admin_id],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows[0]);
      },
    );
  });
};

Admin.makeSuperadmin = function (admin_id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'UPDATE admin_users SET role_id = 3 WHERE admin_id = ?',
      [admin_id],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows[0]);
      },
    );
  });
};

Admin.unsetSupervisor = function (admin_id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'UPDATE admin_users SET role_id = 1 WHERE admin_id = ?',
      [admin_id],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows[0]);
      },
    );
  });
};

Admin.unsetSuperadmin = function (admin_id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'UPDATE admin_users SET role_id = 0 WHERE admin_id = ?',
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
      'UPDATE admin_users SET chapter_id = ? WHERE admin_id = ?',
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

Admin.listByChapter = function (chapter_id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT * FROM admin_users where role_id = 0 and chapter_id = ?',
      [chapter_id],
      (err, supervisors) => {
        if (err) reject(err);
        else {
          resolve(supervisors);
        }
      },
    );
  });
};

module.exports = Admin;
