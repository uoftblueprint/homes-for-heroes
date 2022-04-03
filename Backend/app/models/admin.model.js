const sql = require('./db.js');
const logger = require('../logger');
const bcrypt = require('bcrypt');

// constructor
const Admin = function (body) {
    this.name = body.name;
    this.role_id = 1; // 0 by default
};

Admin.create = function (name, email, phone, password, address, chapter_id) {
    return new Promise((resolve, reject) => {
      const hashedPassword = bcrypt.hashSync(password, 15);
      sql.query(
        'INSERT INTO admin_users (name, email, phone, password, address, chapter_id, role_id) VALUES (?, ?, ?, ?, ?, ?, 1)',
        [name, email, phone, hashedPassword, address, chapter_id],
        (err) => {
          if (err) reject(err);
          else {
            sql.query('SELECT LAST_INSERT_ID() as admin_id', (err, rows) => {
              if (err) reject(err);
              else {
                // eslint-disable-next-line prefer-destructuring
                const [ user_id ] = rows;
                resolve(
                  new Admin({
                    name: name,
                    role_id: 1,
                  }),
                );
              }
            });
          }
        },
      );
    });
  };

Admin.listAll = function () {
    return new Promise(function (resolve, reject) {
        sql.query('SELECT * FROM admin_users', function (err, admins) {
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

Admin.makeSuperadmin = function(admin_id) {
    return new Promise(function (resolve, reject) {
        sql.query('UPDATE admin_users SET role_id = 2 WHERE admin_id = ?',
        [admin_id],
        function (err, rows) {
            if (err) reject (err);
            else resolve(rows[0]);
        });
    });
};

Admin.unsetSuperadmin = function(admin_id) {
    return new Promise(function (resolve, reject) {
        sql.query('UPDATE admin_users SET role_id = 1 WHERE admin_id = ?',
        [admin_id],
        function (err, rows) {
            if (err) reject (err);
            else resolve(rows[0]);
        });
    });
}

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

Admin.listByChapter = function(chapter_id) {
    return new Promise(function (resolve, reject) {
        sql.query('SELECT * FROM admin_users where role_id = 1 and chapter_id = ?', [chapter_id], function (err, supervisors) {
            if (err) reject (err);
            else {
                resolve(supervisors);
            }
        });
    });
}



module.exports = Admin;
