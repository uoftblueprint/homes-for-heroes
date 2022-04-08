const sql = require('./db.js');

const Superadmin = function (body) {
  this.name = body.name;
  this.role_status = 2;
};

Superadmin.listAll = function () {
  return new Promise(function (resolve, reject) {
    sql.query(
      'SELECT c.name FROM admin_users a INNER JOIN client_users c ON a.user_id = c.user_id WHERE c.role_id = 2',
      function (err, superadmins) {
        if (err) reject(err);
        else {
          resolve(superadmins);
        }
      }
    );
  });
};

module.exports = Superadmin;
