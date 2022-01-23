const Admin = require("./admin.model");
const { query } = require("./db");

const AdminProfile = function(user_id, query_params) {
  this.admin_id = admin_id;
  this.name = query_params.name;
  this.email = query_params.email;
  this.phone = query_params.phone;
  this.address = query_params.address;
  this.city = query_params.city;
  this.province = query_params.province;
  this.admin_dob = query_params.admin_dob;
}

AdminProfile.prototype.buildAQuery = function() {
  var update_qry = "";
  // dynamically populate parts of the update query based on given parameters
  var conditions_a = [];
  if (this.name) { conditions_a.push(`name = "${this.name}"`); }
  if (this.email) { conditions_a.push(`email = ${this.email}`); }
  if (this.phone) { conditions_a.push(`phone = ${this.phone}`); }
  if (conditions_a.length > 0) {
    var qry_filter = (conditions_a.length ? ("SET " + conditions_a.join( ", ")) : "");
    var update_qry = `UPDATE admin_users ${qry_filter} WHERE admin_id = ${this.admin_id}`;
  }
  return update_qry;
}

AdminProfile.prototype.buildIQuery = function() {
  var update_qry = "";
  var conditions_i = [];
  if (this.address) { conditions_i.push(`address = "${this.address}"`); }
  if (this.city) { conditions_i.push(`city = "${this.city}"`); }
  if (this.province) { conditions_i.push(`province = "${this.province}"`); }
  if (this.admin_dob) { conditions_i.push(`admin_dob = ${this.admin_dob}`); }
  var qry_filter = (conditions_i.length ? ("SET " + conditions_i.join( ", ")) : "");
  if (conditions_i.length > 0) {
    console.log("Not null");
    var update_qry = `UPDATE AdminInfo ${qry_filter} WHERE admin_id = ${this.admin_id}`;
  }
  return update_qry;
}

AdminProfile.prototype.buildQueries = function() {
  queries = [];
  const a_query = this.buildAQuery();
  const i_query = this.buildIQuery();
  if (a_query != "") {
      queries.push(a_query);
  }
  if (i_query != "") {
      queries.push(i_query);
  }
  console.log(queries);
  return queries;
}

module.exports = AdminProfile;