const BaseQueryData = require('./base-query-data.model');

const CustomFormQueryData = function(query_params) {
  this.admin_id = query_params.admin_id;
  this.form_id = query_params.form_id;
  this.is_final = query_params.is_final;

  // final query
  this.query = '';

  this.constructQuery = function() {
    this.appendQueryParam(this.admin_id, 'form.admin_id');
    this.appendQueryParam(this.form_id, 'form.form_id');
    this.appendQueryParamNonStr(this.is_final, 'form.is_final');
    this.query = (this.query) ? `WHERE ${this.query}`: this.query;
  };
};

// Client User Query
CustomFormQueryData.prototype = new BaseQueryData();

module.exports = CustomFormQueryData;
