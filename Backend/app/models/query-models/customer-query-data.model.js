const BaseQueryData = require('./base-query-data.model');


const CustomerQueryData = function(query_params) {
  BaseQueryData.call(this);

  // client
  this.client_name = query_params.name;
  this.client_email = query_params.email;
<<<<<<< HEAD
    
=======
  this.client_incoming_referral = query_params.incoming_referral;
  this.client_outgoing_referral = query_params.outgoing_referral;

>>>>>>> d5a34a81760923ca6bf93664a7354123cb1cb54e
  // user info
  this.info_phone = query_params.applicant_phone;
  this.info_street_name = query_params.street_name;
  
  // kin
  this.kin_name = query_params.kin_name;
<<<<<<< HEAD
  
=======


>>>>>>> d5a34a81760923ca6bf93664a7354123cb1cb54e
  // offset
  this.page = parseInt(query_params.page);
  this.limit = parseInt(query_params.page_size);
  this.offset = (this.page - 1) * this.limit;
  
  // final query
  this.query = '';

<<<<<<< HEAD
  this.constructQuery = function() {
    this.appendQueryParam(this.client_name, 'client.name');
    this.appendQueryParam(this.client_email, 'client.email');
    this.appendQueryParam(this.info_phone, 'info.applicant_phone');
    this.appendQueryParam(this.info_street_name, 'info.street_name');
    this.appendQueryParam(this.kin_name, 'kin.kin_name');
    this.query = (this.query) ? `WHERE ${this.query}`: this.query;
  };

=======
  this.constructQuery = function () {
    //Get only veteran
    this.appendQueryParam('0', 'client.role_id');

    this.appendQueryParamKeyword(this.client_name, 'client.name');
    this.appendQueryParamKeyword(this.client_email, 'client.email');
    this.appendQueryParamKeyword(this.info_phone, 'info.applicant_phone');
    this.appendQueryParamKeyword(this.info_street_name, 'info.street_name');
    this.appendQueryParamKeyword(this.kin_name, 'kin.kin_name');
    this.appendQueryParamKeyword(this.client_incoming_referral, 'client.incoming_referral');
    this.appendQueryParamKeyword(this.client_outgoing_referral, 'client.outgoing_referral');
    this.query = this.query ? `WHERE ${this.query}` : this.query;
  };

  this.constructEditQuery = function () {
    this.appendUpdateParam(this.client_name, 'client.name');
    this.appendUpdateParam(this.client_email, 'client.email');
    this.appendUpdateParam(this.info_phone, 'info.applicant_phone');
    this.appendUpdateParam(this.info_street_name, 'info.street_name');
    this.appendUpdateParam(this.kin_name, 'kin.kin_name');
    this.appendUpdateParam(this.client_incoming_referral, 'client.incoming_referral');
    this.appendUpdateParam(this.client_outgoing_referral, 'client.outgoing_referral');
    this.query = this.query ? `SET ${this.query}` : this.query;
  };
>>>>>>> d5a34a81760923ca6bf93664a7354123cb1cb54e
};

CustomerQueryData.prototype = new BaseQueryData();

module.exports = CustomerQueryData;
