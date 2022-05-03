const BaseQueryData = require('./base-query-data.model');

const VolunteerQueryData = function (query_params) {
  BaseQueryData.call(this);
  this.name = query_params.name;
  this.village = query_params.village;
  this.date_joined = query_params.date_joined;
  this.role = query_params.role;
  this.phone = query_params.phone;
  this.email = query_params.email;
  this.page = parseInt(query_params.page);
  this.limit = parseInt(query_params.page_size);
  this.offset = (this.page - 1) * this.limit;

  // final query
  this.query = '';

  this.constructQuery = function () {
    this.appendQueryParamKeyword(this.name, 'volunteers.name'); 
    this.appendQueryParamKeyword(this.village, 'volunteers.village');
    this.appendQueryParamKeyword(this.address, 'volunteers.date_joined');
    this.appendQueryParamKeyword(this.role, 'volunteers.role');
    this.appendQueryParamKeyword(this.phone, 'volunteers.phone');
    this.appendQueryParamKeyword(this.email, 'volunteers.email');
    this.query = this.query ? `WHERE ${this.query}` : this.query;
  };

  this.constructEditQuery = function () {
    this.appendUpdateParam(this.name, 'volunteers.name'); 
    this.appendUpdateParam(this.village, 'volunteers.village');
    this.appendUpdateParam(this.date_joined, 'volunteers.date_joined');
    this.appendUpdateParam(this.role, 'volunteers.role');
    this.appendUpdateParam(this.phone, 'volunteers.phone');
    this.appendUpdateParam(this.email, 'volunteers.email');
    this.query = this.query ? `SET ${this.query}` : this.query;
  };
};


VolunteerQueryData.prototype = new BaseQueryData();

module.exports = VolunteerQueryData;
