const sql = require('./db.js');

// constructor
const Superadmin = function (body) {
    this.name = body.name;
    this.role_status = 2;
};

Superadmin.listAll = function() {
    return new Promise(function (resolve, reject) {
        sql.query('SELECT * FROM admin_users where role_id = 3', function (err, superadmins) {
            if (err) reject (err);
            else {
                resolve(superadmins);
            }
        });
    });
}

module.exports = Superadmin;