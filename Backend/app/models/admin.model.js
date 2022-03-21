const sql = require('./db.js');
const logger = require('../logger');

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

Admin.getRole = function(admin_id) {
    return new Promise(function (resolve, reject) {
        sql.query('SELECT role_id FROM admin_users WHERE admin_id = ?', [admin_id], 
        function (err, results) {
            if (err) reject (err);
            else resolve(JSON.parse(JSON.stringify(results[0])).role_id);
        });
    });
}

Admin.makeSuperadmin = function(admin_id) {
    return new Promise(function (resolve, reject) {
        sql.query('UPDATE admin_users SET role_id = 1 WHERE admin_id = ?',
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

Admin.assignChapter = function(admin_id, chapter_id) {
    logger.debug(admin_id);
    return new Promise(function (resolve, reject) {
        sql.query(`UPDATE admin_users SET chapter_id = ? WHERE admin_id = ?`, [chapter_id, admin_id], 
        function(err, results) {
            if (err) reject (err);
            else {
                resolve(admin_id);
            }
        });
    });
}

Admin.listByChapter = function(chapter_id) {
    return new Promise(function (resolve, reject) {
        sql.query('SELECT * FROM admin_users where role_id = 0 and chapter_id = ?', [chapter_id], function (err, supervisors) {
            if (err) reject (err);
            else {
                resolve(supervisors);
            }
        });
    });
}

module.exports = Admin;