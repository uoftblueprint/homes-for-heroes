const BaseQueryData = require('./base-query-data.model');

const SupporterQueryData = function (query_params) {
    BaseQueryData.call(this);
    this.name = query_params.name;
    this.date_gifted = query_params.date_gifted;
    this.gift_provided = query_params.gift_provided;
    this.phone = query_params.phone;
    this.email = query_params.email;
    this.page = parseInt(query_params.page);
    this.limit = parseInt(query_params.page_size);
    this.offset = (this.page - 1) * this.limit;
  
    // final query
    this.query = '';
  
    this.constructQuery = function () {
      this.appendQueryParamKeyword(this.name, 'supporters.name');
      this.appendQueryParamKeyword(this.date_gifted, 'supporters.date_gifted');
      this.appendQueryParamKeyword(this.gift_provided, 'supporters.gift_provided'); 
      this.appendQueryParamKeyword(this.phone, 'supporters.phone');
      this.appendQueryParamKeyword(this.email, 'supporters.email');
      this.query = this.query ? `WHERE ${this.query}` : this.query;
    };

    this.constructEditQuery = function () {
      this.appendUpdateParam(this.name, 'supporters.name');
      this.appendUpdateParam(this.date_gifted, 'supporters.date_gifted');
      this.appendUpdateParam(this.gift_provided, 'supporters.gift_provided'); 
      this.appendUpdateParam(this.phone, 'supporters.phone');
      this.appendUpdateParam(this.email, 'supporters.email');
      this.query = this.query ? `SET ${this.query}` : this.query;
    };
  };
  
SupporterQueryData.prototype = new BaseQueryData();

module.exports = SupporterQueryData;
