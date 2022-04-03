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
    this.appendQueryParam(this.org_name, 'partners.org_name');
    this.appendQueryParam(this.city, 'partners.city');
    this.appendQueryParam(this.village, 'partners.village');
    this.appendQueryParam(this.address, 'partners.address');
    this.appendQueryParam(this.phone, 'partners.phone');
    this.query = this.query ? `WHERE ${this.query}` : this.query;
  };
};

PartnerQueryData.prototype = new BaseQueryData();

module.exports = PartnerQueryData;
