const BaseQueryData = require('./base-query-data.model');

const SupporterQueryData = function (query_params) {
    BaseQueryData.call(this);
    this.name = query_params.name;
    this.date_gifted = query_params.date_gifted;
    this.gift_provided = query_params.gift_provided;
    this.phone = query_params.phone;
    this.page = parseInt(query_params.page);
    this.limit = parseInt(query_params.page_size);
    this.offset = (this.page - 1) * this.limit;
  
    // final query
    this.query = '';
  
    this.constructQuery = function () {
      this.appendQueryParam(this.name, 'partners.name');
      this.appendQueryParam(this.date_gifted, 'partners.date_gifted');
      this.appendQueryParam(this.gift_provided, 'partners.gift_provided'); 
      this.appendQueryParam(this.phone, 'partners.phone');
      this.query = this.query ? `WHERE ${this.query}` : this.query;
    };
  };
  
SupporterQueryData.prototype = new BaseQueryData();

module.exports = SupporterQueryData;
