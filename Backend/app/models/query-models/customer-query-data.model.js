const BaseQueryData = require('./base-query-data.model');


const CustomerQueryData = function(query_params) {
  BaseQueryData.call(this);

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

  this.constructQuery = function() {
    this.appendQueryParam(this.client_name, 'client.name');
    this.appendQueryParam(this.client_email, 'client.email');
    this.appendQueryParam(this.info_phone, 'info.applicant_phone');
    this.appendQueryParam(this.info_street_name, 'info.street_name');
    this.appendQueryParam(this.kin_name, 'kin.kin_name');
    this.query = (this.query) ? `WHERE ${this.query}`: this.query;
  };

};

CustomerQueryData.prototype = new BaseQueryData();

module.exports = CustomerQueryData;
