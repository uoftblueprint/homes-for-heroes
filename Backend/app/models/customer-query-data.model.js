const CustomerQueryData = function(query_params) {
    // client
    this.client_name = query_params.name;
    this.client_email = query_params.email;
    
    // user info
    this.info_phone = query_params.phone;
    this.info_street_name = query_params.street_name;
  
    // kin
    this.kin_name = query_params.kin_name;
  
    // offset
    this.page = parseInt(query_params.page);
    this.limit = parseInt(query_params.page_size);
    this.offset = (this.page - 1) * this.limit;
  
    // final query
    this.query = '';
  }
 
  CustomerQueryData.prototype.validate = function() {

  }
  
  CustomerQueryData.prototype.appendQueryParam = function(param) {
    if (!param) return;
    this.query = (this.query) ? `${this.query} AND ${param}`: param;
  }
  
  // Client User Query
  CustomerQueryData.prototype.constructQuery = function() {
    this.appendQueryParam((this.client_name) ? `client.name LIKE "${this.client_name}%"`: '');
    this.appendQueryParam((this.client_email) ? `client.email = "${this.client_email}"`: '');
    this.appendQueryParam((this.info_phone) ? `info.applicant_phone = ${this.info_phone}`: '');
    this.appendQueryParam((this.info_street_name) ? `info.street_name = "${this.info_street_name}"`: '');
    this.appendQueryParam((this.kin_name) ? `kin.kin_name LIKE "${this.kin_name}%"`: '');
    this.query = (this.query) ? `WHERE ${this.query}`: this.query;
  }

  module.exports = CustomerQueryData;
