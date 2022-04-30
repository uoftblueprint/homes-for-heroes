const CustomerProfile = function(user_id, body) {
  this.user_id = user_id;
  this.name = body.name;
  this.email = body.email;
  this.phone = body.phone;
  this.street_name = body.street_name;
  this.city = body.city;
  this.province = body.province;
  this.applicant_dob = body.applicant_dob;
};

CustomerProfile.prototype.buildCQuery = function() {
  return `UPDATE client_users SET name = '${this.name}', email = '${this.email}', phone = '${this.phone}' WHERE user_id = ${this.user_id}`;
};

CustomerProfile.prototype.buildUQuery = function() {
  return `UPDATE UserInfo SET street_name = '${this.street_name}', city = '${this.city}', province = '${this.province}', applicant_dob = '${this.applicant_dob}' WHERE user_id = ${this.user_id}`;
};

CustomerProfile.prototype.buildQueries = function() {
  const queries = [];
  queries.push(this.buildCQuery());
  queries.push(this.buildUQuery());
  return queries;
};

module.exports = CustomerProfile;