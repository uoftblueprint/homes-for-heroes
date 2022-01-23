const sql = require('./db.js');
const AdminProfile = require('./admin-profile.model');

// constructor
const Admin = function (admin) {
  this.user_id = admin.user_id;
  this.name = admin.name;
  this.email = admin.email;
  this.phone = admin.phone;
};

Admin.getAdminInfo = function(admin_id) {
  return new Promise((resolve, reject) => {
    const query = 
    `select a.name, a.email, a.phone, a.address,
    i.city, i.province, i.admin_dob 
    from admin_users as a inner join AdminInfo as i 
    on a.admin_id = i.admin_id where a.admin_id = ?`
      sql.query(query, [admin_id], function(err, adminInfo) {
          if (err) reject(err);
          resolve(adminInfo);
      });
  });
};

Admin.updateProfile = function(admin_id, query_params) {
  return new Promise((resolve, reject) => {
    const adm = new AdminProfile(admin_id, query_params);
    queries = adm.buildQueries();
    qry = queries.join(";");
    sql.query(qry,
      function(err, rows) {
        if (err) reject(err);
        else resolve(rows);
      });
  });
};

module.exports = Admin;

