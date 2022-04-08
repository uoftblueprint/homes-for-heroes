const sql = require('./db.js');
const bcrypt = require('bcrypt');

const Admin = function (body) {
    this.name = body.name;
    this.role_id = 1; // 0 by default
};

Admin.create = function (name, email, phone, password, chapter_id) {
    return new Promise((resolve, reject) => {
      const hashedPassword = bcrypt.hashSync(password, 15);
      sql.query(
        'INSERT INTO client_users (name, email, phone, password, role_id, verified, oauth) VALUES (?, ?, ?, ?, 1, FALSE, FALSE)',
        [name, email, phone, hashedPassword],
        (err) => {
          if (err) reject(err);
          else {
            sql.query('SELECT LAST_INSERT_ID() as admin_id', (err, rows) => {
              if (err) reject(err);
              else {
                // eslint-disable-next-line prefer-destructuring
                const admin_id = JSON.parse(JSON.stringify(rows[0])).admin_id;
                sql.query('INSERT INTO admin_users (user_id, default_password, chapter_id) VALUES (?, ?, ?)',
                [admin_id, hashedPassword, chapter_id],
                (err) => {
                  if (err) reject (err);
                  else {
                    resolve(
                      new Admin({
                        name: name,
                        role_id: 1,
                      }),
                    );
                  }
                }
                )
              }
            });
          }
        },
      );
    });
  };

Admin.listAll = function () {
    return new Promise(function (resolve, reject) {
        sql.query('SELECT c.name, c.role_id, a.chapter_id FROM admin_users a INNER JOIN client_users c ON a.user_id = c.user_id', function (err, admins) {
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
      'SELECT c.name, c.email, c.address FROM admin_users a INNER JOIN client_users c ON a.user_id = c.user_id WHERE name LIKE ? and role_id != 1',
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
        sql.query('UPDATE client_users SET role_id = 2 WHERE user_id = ?',
        [admin_id],
        function (err, rows) {
            if (err) reject (err);
            else {
              sql.query('UPDATE admin_users SET chapter_id = NULL WHERE user_id = ?', [admin_id],
              function (err, rows) {
                if (err) reject (err);
                resolve(rows[0]);
              });
            };
        });
    });
};

Admin.unsetSuperadmin = function(admin_id) {
    return new Promise(function (resolve, reject) {
        sql.query('UPDATE client_users SET role_id = 1 WHERE user_id = ?',
        [admin_id],
        function (err, rows) {
            if (err) reject (err);
            else resolve(rows[0]);
        });
    });
}

Admin.assignChapter = function (admin_id, chapter_id) {
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
    return new Promise(function (resolve, reject) {
        sql.query('SELECT c.name FROM admin_users a INNER JOIN client_users c ON a.user_id = c.user_id where c.role_id = 1 and a.chapter_id = ?', [chapter_id], function (err, admins) {
            if (err) reject (err);
            else {
                resolve(admins);
            }
        });
    });
}

Admin.getRole = function(admin_id) {
  return new Promise(function(resolve, reject) {
    sql.query('SELECT c.role_id FROM admin_users a INNER JOIN client_users c ON a.user_id = c.user_id WHERE a.user_id = ?', [admin_id],
    function (err, rows) {
      if (err) reject (err);
      else {
        resolve(JSON.parse(JSON.stringify(rows[0])).role_id);
      }
    })
  })
}


module.exports = Admin;
