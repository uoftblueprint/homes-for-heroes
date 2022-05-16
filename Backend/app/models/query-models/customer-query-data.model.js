const BaseQueryData = require('./base-query-data.model');

const CustomerQueryData = function (query_params) {
  BaseQueryData.call(this);

  // chapter
  this.chapter_id = query_params.chapter_id;
  this.chapter_name = query_params.chapter_name;

  // client
  this.client_name = query_params.name;
  this.client_email = query_params.email;
  this.client_phone = query_params.applicant_phone;

  // user info
  this.info_gender = query_params.gender;
  this.info_email = query_params.email
  this.info_phone = query_params.applicant_phone;
  this.info_dob = query_params.applicant_dob;
  this.info_street_name = query_params.street_name;
  this.info_curr_level = query_params.curr_level;
  this.info_city = query_params.city;
  this.info_province = query_params.province; 
  this.info_referral = query_params.referral;
  this.info_outgoing = query_params.outgoing;
  this.info_income = query_params.income;
  this.info_demographic = query_params.demographic; 

  // kin
  this.kin_name = query_params.kin_name;


  // offset
  this.page = parseInt(query_params.page);
  this.limit = parseInt(query_params.page_size);
  this.offset = (this.page - 1) * this.limit;

  // final query
  this.query = '';
  this.queryArray = [];

  this.constructQuery = function () {
    //Get only veteran
    this.appendQueryParam('0', 'client.role_id');

    this.appendQueryParamNonStr(this.chapter_id, 'client.chapter_id');
    this.appendQueryParamKeyword(this.client_name, 'client.name');
    this.appendQueryParamKeyword(this.client_email, 'client.email');
    this.appendQueryParamKeyword(this.info_phone, 'info.applicant_phone');
    this.appendQueryParamKeyword(this.info_street_name, 'info.street_name');
    this.appendQueryParamKeyword(this.kin_name, 'kin.kin_name');
    this.appendQueryParamKeyword(this.info_referral, 'info.referral');
    this.appendQueryParamKeyword(this.info_outgoing, 'info.outgoing');
    this.appendQueryParamKeyword(this.info_curr_level, 'info.curr_level')
    this.appendQueryParamKeyword(this.info_income, 'info.income');
    this.appendQueryParamKeyword(this.info_demographic, 'info.demographic');
    this.appendQueryParamKeyword(this.chapter_name, 'chap.chapter_name');
    this.query = this.query ? `WHERE ${this.query}` : this.query;
  };

  this.constructEditQuery = function () {
    this.appendUpdateParam(this.client_name, 'client.name');
    this.appendUpdateParam(this.client_email, 'client.email');
    this.appendUpdateParam(this.client_phone, 'client.phone')
    this.appendUpdateParam(this.info_phone, 'info.applicant_phone');
    this.appendUpdateParam(this.info_gender, 'info.gender');
    this.appendUpdateParam(this.info_email, 'info.email');
    this.appendUpdateParam(this.info_dob, 'info.applicant_dob');
    this.appendUpdateParam(this.info_city, 'info.city');
    this.appendUpdateParam(this.info_province, 'info.province');
    this.appendUpdateParam(this.info_street_name, 'info.street_name');
    this.appendUpdateParam(this.info_referral, 'info.referral');
    this.appendUpdateParam(this.info_outgoing, 'info.outgoing');
    this.appendUpdateParam(this.info_curr_level, 'info.curr_level')
    this.appendUpdateParam(this.info_income, 'info.income');
    this.appendUpdateParam(this.info_demographic, 'info.demographic');
    this.appendUpdateParam(this.chapter_name, 'client.chapter_id');
    this.query = this.query ? `SET ${this.query}` : this.query;
  };

};

CustomerQueryData.prototype = new BaseQueryData();

module.exports = CustomerQueryData;
