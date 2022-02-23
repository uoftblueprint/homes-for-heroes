const Customer = require("./customer.model");
const { query } = require("./db");

const CustomerProfile = function(user_id, body) {
  this.user_id = user_id;
  this.name = body.name;
  this.email = body.email;
  this.phone = body.phone;
  this.street_name = body.street_name;
  this.city = body.city;
  this.province = body.province;
  this.applicant_dob = body.applicant_dob;
}

CustomerProfile.prototype.buildCQuery = function() {
  var update_qry = `UPDATE client_users SET name = '${this.name}', email = '${this.email}', phone = '${this.phone}' WHERE user_id = ${this.user_id}`;
  return update_qry;
}

CustomerProfile.prototype.buildUQuery = function() {
  var update_qry = `UPDATE UserInfo SET street_name = '${this.street_name}', city = '${this.city}', province = '${this.province}', applicant_dob = '${this.applicant_dob}' WHERE user_id = ${this.user_id}`;
  return update_qry;
}

CustomerProfile.prototype.buildQueries = function() {
  var queries = [];
  queries.push(this.buildCQuery());
  queries.push(this.buildUQuery());
  return queries;
}

module.exports = CustomerProfile;