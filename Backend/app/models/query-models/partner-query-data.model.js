const BaseQueryData = require('./base-query-data.model');

const PartnerQueryData = function (query_params) {
  BaseQueryData.call(this);
  this.org_name = query_params.org_name;
  this.city = query_params.city;
  this.village = query_params.village;
  this.address = query_params.address;
  this.phone = query_params.phone;
  this.page = parseInt(query_params.page);
  this.limit = parseInt(query_params.page_size);
  this.offset = (this.page - 1) * this.limit;

  // final query
  this.query = '';

  this.constructQuery = function () {
    this.appendQueryParamKeyword(this.org_name, 'partners.org_name');
    this.appendQueryParamKeyword(this.city, 'partners.city');
    this.appendQueryParamKeyword(this.village, 'partners.village');
    this.appendQueryParamKeyword(this.address, 'partners.address');
    this.appendQueryParamKeyword(this.phone, 'partners.phone');
    this.query = this.query ? `WHERE ${this.query}` : this.query;
  };

  this.constructEditQuery = function () {
    this.appendUpdateParam(this.org_name, 'partners.org_name');
    this.appendUpdateParam(this.city, 'partners.city');
    this.appendUpdateParam(this.village, 'partners.village');
    this.appendUpdateParam(this.address, 'partners.address');
    this.appendUpdateParam(this.phone, 'partners.phone');
    this.query = this.query ? `SET ${this.query}` : this.query;
  }
};

PartnerQueryData.prototype = new BaseQueryData();

module.exports = PartnerQueryData;
