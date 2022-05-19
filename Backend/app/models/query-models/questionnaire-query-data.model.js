const BaseQueryData = require('./base-query-data.model');

const QuestionnaireQueryData = function(query_params) {
  this.user_id = query_params.user_id;
  this.form_id = query_params.form_id;
  this.created_date = query_params.created_date;

  // final query
  this.query = '';
  this.queryArray = [];

  this.constructQuery = function() {
    this.appendQueryParam(this.user_id, 'questionnaire.user_id');
    this.appendQueryParam(this.form_id, 'questionnaire.form_id');
    this.query = (this.query) ? `WHERE ${this.query}`: this.query;
  };
};

// Client User Query
QuestionnaireQueryData.prototype = new BaseQueryData();

module.exports = QuestionnaireQueryData;