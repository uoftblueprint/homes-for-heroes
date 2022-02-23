const Admin = require("./admin.model");
const { query } = require("./db");

const AdminProfile = function(admin_id, body) {
  this.admin_id = admin_id;
  this.name = body.name;
  this.email = body.email;
  this.phone = body.phone;
  this.address = body.address;
  this.city = body.city;
  this.province = body.province;
  this.admin_dob = body.admin_dob;
}

AdminProfile.prototype.buildAQuery = function() {
  var update_qry = `UPDATE admin_users SET name = '${this.name}', email = '${this.email}', phone = '${this.phone}', address = '${this.address}' WHERE admin_id = ${this.admin_id}`;
  return update_qry;
}

AdminProfile.prototype.buildIQuery = function() {
  var update_qry = `UPDATE AdminInfo SET city = '${this.city}', province = '${this.province}', admin_dob = '${this.admin_dob}' WHERE admin_id = ${this.admin_id}`;
  return update_qry;
}

AdminProfile.prototype.buildQueries = function() {
  queries = [];
  queries.push(this.buildAQuery());
  queries.push(this.buildIQuery());
  return queries;
}

module.exports = AdminProfile;