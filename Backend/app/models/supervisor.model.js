const sql = require('./db.js');

// constructor
const Supervisor = function (body) {
    this.name = body.name;
    this.role_status = 1;
};

Supervisor.listAll = function() {
    return new Promise(function (resolve, reject) {
        sql.query('SELECT * FROM admin_users where role_id = 2', function (err, supervisors) {
            if (err) reject (err);
            else {
                resolve(supervisors);
            }
        });
    });
}

Supervisor.assignChapter = function(admin_id, chapter_id) {
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

Supervisor.listByChapter = function(chapter_id) {
    return new Promise(function (resolve, reject) {
        sql.query('SELECT * FROM admin_users where role_id = 2 and chapter_id = ?', [chapter_id], function (err, supervisors) {
            if (err) reject (err);
            else {
                resolve(supervisors);
            }
        });
    });
}

module.exports = Supervisor;