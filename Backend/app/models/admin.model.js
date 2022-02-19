const sql = require('./db.js');

// constructor
const Admin = function (body) {
    this.name = body.name;
    this.role_id = 0; // 0 by default
};

Admin.listAll = function() {
    return new Promise(function (resolve, reject) {
        sql.query('SELECT * FROM admin_users', function (err, admins) {
            if (err) reject (err);
            else {
                resolve(admins);
            }
        });
    });
};

Admin.makeSupervisor = function(admin_id) {
    return new Promise(function (resolve, reject) {
        sql.query('UPDATE admin_users SET role_id = 1 WHERE admin_id = ?',
        [admin_id],
        function (err, rows) {
            if (err) reject (err);
            else resolve(rows[0]);
        });
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

Admin.unsetSupervisor = function(admin_id) {
    return new Promise(function (resolve, reject) {
        sql.query('UPDATE admin_users SET role_id = 0 WHERE admin_id = ?',
        [admin_id],
        function (err, rows) {
            if (err) reject (err);
            else resolve(rows[0]);
        });
    });
};

Admin.unsetSuperadmin = function(admin_id) {
    return new Promise(function (resolve, reject) {
        sql.query('UPDATE admin_users SET role_id = 0 WHERE admin_id = ?',
        [admin_id],
        function (err, rows) {
            if (err) reject (err);
            else resolve(rows[0]);
        });
    });
}

module.exports = Admin;