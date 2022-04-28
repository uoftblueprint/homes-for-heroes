const sql = require('./db.js');
const logger = require('../logger');
const Customer = require('./customer.model');

// constructor
const Admin = function (admin) {
  this.user_id = admin.user_id;
  this.chapter_id = admin.chapter_id;
  this.role_id = admin.role_id || 1;
  this.adminCustomer = admin.adminCustomer;
};

Admin.create = function (name, email, phone, password, chapter_id, role_id = 1) {
  return new Promise((resolve, reject) => {
    sql.getConnection((err, conn) => {
      if (err) return reject(err);
      conn.beginTransaction((err) => {
        if (err) return reject(err);
        const adminCustomer = Customer.create(name, phone, email, password, role_id, conn); // role_id of 1 (supervisor) by default
        conn.query(
          'INSERT INTO admin_users (user_id, chapter_id) VALUES (?, ?)',
          [adminCustomer.user_id, chapter_id],
          (err, result) => {
            if (err) return conn.rollback(() => reject(err));
            else if (!result.insertId) return reject(new Error('Could not create admin'));

            conn.commit((err) => {
              if (err) return conn.rollback(() => reject(err));
              // Return a new admin
              resolve(new Admin({
                user_id: adminCustomer.user_id,
                chapter_id,
                role_id,
                adminCustomer
              }));
            });
          });
      });
    });
  });
};

Admin.createTemp = function (name, email, chapter_id, role_id = 1) {
  return new Promise((resolve, reject) => {
    sql.getConnection((err, conn) => {
      if (err) return reject(err);

      conn.beginTransaction((err) => {
        if (err) return reject(err);
        const adminCustomer = Customer.createTemp(name, email, role_id, conn); // role_id of 1 (supervisor) by default
        conn.query(
          'INSERT INTO admin_users (user_id, chapter_id) VALUES (?, ?)',
          [adminCustomer.user_id, chapter_id],
          (err, result) => {
            if (err) return conn.rollback(() => reject(err));
            else if (!result.insertId) return reject(new Error('Could not create admin'));

            conn.commit((err) => {
              if (err) return conn.rollback(() => reject(err));
              // Return a new admin
              resolve(new Admin({
                user_id: adminCustomer.user_id,
                chapter_id,
                role_id,
                adminCustomer
              }));
            });
          });
      });
    });
  });
};

Admin.listAll = function () {
  return new Promise((resolve, reject) => {
    sql.query('SELECT a.*, c.* FROM admin_users AS a JOIN client_users AS c ON a.user_id = c.user_id', (err, admins) => {
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
    sql.query('SELECT a.*, c.* FROM admin_users AS a JOIN client_users AS c ON a.user_id = c.user_id WHERE c.role_id = ?',
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
      'SELECT a.*, c.* FROM admin_users AS a JOIN client_users AS c ON a.user_id = c.user_id WHERE c.name LIKE ? AND c.role_id > 0',
      [`%${name}%`],
      (err, admins) => {
        if (err) reject(err);
        resolve(admins);
      },
    );
  });
};

Admin.makeSupervisor = function(admin_id) {
  return new Promise((resolve, reject) => {
    sql.query('UPDATE client_users SET role_id = 1 WHERE user_id = ?',
      [admin_id],
      (err, rows) => {
        if (err) reject (err);
        else resolve(rows[0]);
      });
  });
};

Admin.makeSuperadmin = function(admin_id) {
  return new Promise((resolve, reject) => {
    sql.query('UPDATE client_users SET role_id = 2 WHERE user_id = ?',
      [admin_id],
      (err, rows) => {
        if (err) reject (err);
        else resolve(rows[0]);
      });
  });
};

Admin.unsetSupervisor = function (admin_id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'UPDATE client_users SET role_id = 1 WHERE user_id = ?',
      [admin_id],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows[0]);
      },
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

Admin.unsetSuperadmin = function(admin_id) {
  return new Promise((resolve, reject) => {
    sql.query('UPDATE client_users SET role_id = 1 WHERE user_id = ?',
      [admin_id],
      (err, rows) => {
        if (err) reject (err);
        else resolve(rows[0]);
      });
  });
};

Admin.assignChapter = function (admin_id, chapter_id) {
  logger.debug(admin_id);
  return new Promise((resolve, reject) => {
    sql.query(
      'UPDATE admin_users SET chapter_id = ? WHERE user_id = ?',
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
    sql.query('SELECT a.*, c.* FROM admin_users AS a JOIN client_users AS c ON a.user_id = c.user_id WHERE c.role_id = 1 AND a.chapter_id = ?',
      [chapter_id], (err, supervisors) => {
        if (err) reject (err);
        else {
          resolve(supervisors);
        }
      });
  });
};



module.exports = Admin;
