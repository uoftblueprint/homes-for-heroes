const BaseQueryData = require('./base-query-data.model');

const VolunteerQueryData = function (query_params) {
  BaseQueryData.call(this);
  this.name = query_params.name;
  this.village = query_params.village;
  this.date_joined = query_params.date_joined;
  this.role = query_params.role;
  this.phone = query_params.phone;
  this.page = parseInt(query_params.page);
  this.limit = parseInt(query_params.page_size);
  this.offset = (this.page - 1) * this.limit;

  // final query
  this.query = '';

  this.constructQuery = function () {
    this.appendQueryParam(this.name, 'volunteers.name'); 
    this.appendQueryParam(this.village, 'volunteers.village');
    this.appendQueryParam(this.address, 'volunteers.date_joined');
    this.appendQueryParam(this.role, 'volunteers.role');
    this.appendQueryParam(this.phone, 'volunteers.phone');
    this.query = this.query ? `WHERE ${this.query}` : this.query;
  };
};


VolunteerQueryData.prototype = new BaseQueryData();

module.exports = VolunteerQueryData;
