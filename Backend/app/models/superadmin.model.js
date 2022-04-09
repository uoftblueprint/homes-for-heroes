const Admin = require('./admin.model');

// constructor
const Superadmin = function () {
  this.role_id = 2;
};

Superadmin.listAll = function() {
  return Admin.listAllRole(2);
};

module.exports = Superadmin;