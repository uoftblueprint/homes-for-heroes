const sql = require('./db.js');
const CustomFormQueryData = require('./query-models/custom-form-query-data.model');
const logger = require('../logger');

// constructor
const CustomForm = function (body) {
  this.admin_id = body.admin_id;
  this.title = body.title;
  this.form_body = JSON.stringify(body.form_body);
};

// create form
CustomForm.prototype.create = function () {
  this.validate();
  return new Promise((resolve, reject) => {
    sql.query(
      'INSERT INTO CustomForm (admin_id, title, form_body) VALUES (?)',
      [[this.admin_id, this.title, this.form_body]],
      (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      },
    );
  });
};

// takes custom query and queries form CustomForm table
CustomForm.queryForm = function (query_params) {
  return new Promise((resolve, reject) => {
    // construct query
    let q = new CustomFormQueryData(query_params);
    q.constructQuery();
    logger.debug(q);

    const data_query = `
        SELECT
          form.form_id, form.admin_id, form.created_date, form.title, form.form_body
        FROM CustomForm AS form
        ${q.query}
        ORDER BY form.created_date DESC
        `;
    logger.debug(data_query);

    sql.query(data_query, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

module.exports = CustomForm;
