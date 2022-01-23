const Customer = require("./customer.model");
const { query } = require("./db");

const CustomerProfile = function(user_id, query_params) {
  this.user_id = user_id;
  this.name = query_params.name;
  this.email = query_params.email;
  this.phone = query_params.phone;
  this.street_name = query_params.street_name;
  this.city = query_params.city;
  this.province = query_params.province;
  this.applicant_dob = query_params.applicant_dob;
}

CustomerProfile.prototype.buildCQuery = function() {
  var update_qry = "";
  // dynamically populate parts of the update query based on given parameters
  var conditions_c = [];
  if (this.name) { conditions_c.push(`name = "${this.name}"`); }
  if (this.email) { conditions_c.push(`email = ${this.email}`); }
  if (this.phone) { conditions_c.push(`phone = ${this.phone}`); }
  if (conditions_c.length > 0) {
    var qry_filter = (conditions_c.length ? ("SET " + conditions_c.join( ", ")) : "");
    var update_qry = `UPDATE client_users ${qry_filter} WHERE user_id = ${this.user_id}`;
  }
  return update_qry;
}

CustomerProfile.prototype.buildUQuery = function() {
  var update_qry = "";
  var conditions_u = [];
  if (this.street_name) { conditions_u.push(`street_name = "${this.street_name}"`); }
  if (this.city) { conditions_u.push(`city = "${this.city}"`); }
  if (this.province) { conditions_u.push(`province = "${this.province}"`); }
  if (this.applicant_dob) { conditions_u.push(`applicant_dob = ${this.applicant_dob}`); }
  var qry_filter = (conditions_u.length ? ("SET " + conditions_u.join( ", ")) : "");
  if (conditions_u.length > 0) {
    console.log("Not null");
    var update_qry = `UPDATE UserInfo ${qry_filter} WHERE user_id = ${this.user_id}`;
  }
  return update_qry;
}

CustomerProfile.prototype.buildQueries = function() {
  queries = [];
  c_query = this.buildCQuery();
  u_query = this.buildUQuery();
  if (c_query != "") {
      queries.push(c_query);
  }
  if (u_query != "") {
      queries.push(u_query);
  }
  console.log(queries);
  return queries;
}

module.exports = CustomerProfile;