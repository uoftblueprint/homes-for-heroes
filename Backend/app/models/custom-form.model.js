const sql = require('./db.js');
const CustomFormQueryData = require('./query-models/custom-form-query-data.model');
const logger = require('../logger');

// constructor
const CustomForm = function (body) {
  this.form_id = body.form_id;
  this.admin_id = body.admin_id;
  this.title = body.title;
  this.curr_level = body.curr_level.join(' ');
  this.form_body = JSON.stringify(body.form_body);

  this.validateNew = function() {
    if (!this.admin_id || !this.title || !this.form_body) {
      throw 'invalid request, new Form';
    }
  };

};

// create Form
CustomForm.prototype.create = function() {
  this.validateNew();
  return new Promise((resolve, reject) => {
    sql.query(
      'INSERT INTO CustomForm (admin_id, title, form_body, curr_level) VALUES (?)',
      [[this.admin_id, this.title, this.form_body, this.curr_level]],
      (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      },
    );
  });
};


// publish Form
CustomForm.publish = function(form_id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'UPDATE CustomForm SET is_final = ? WHERE form_id = ?',
      [true, form_id],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows[0]);
      }
    );
  });
};

// update Form
CustomForm.prototype.update = function() {
  return new Promise((resolve, reject) => {
    sql.query(
      'UPDATE CustomForm SET title = ?, form_body = ?, curr_level = ? WHERE form_id = ? AND is_final = false',
      [this.title, this.form_body, this.curr_level, this.form_id],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows[0]);
      }
    );
  });
};

// takes custom query and queries Form CustomForm table
CustomForm.queryForm = function(query_params) {
  return new Promise((resolve, reject) => {
    // construct query
    const q = new CustomFormQueryData(query_params);
    q.constructQuery();
    logger.debug(JSON.stringify(q));

    const data_query = `
            SELECT *
            FROM CustomForm AS form
                ${q.query}
            ORDER BY form.created_date DESC
        `;

    sql.query(data_query, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

module.exports = CustomForm;
