const sql = require('./db.js');
const CustomFormQueryData = require("./query-models/custom-form-query-data.model");

// constructor
const CustomForm = function (body) {
    this.form_id = body.form_id
    this.admin_id = body.admin_id
    this.title = body.title
    this.form_body = JSON.stringify(body.form_body)

    this.validateNew = function() {
        if (!this.admin_id || !this.title || !this.form_body) {
            throw "invalid request";
        }
    }

    this.validateExisting = function() {
        if (!this.form_id) {
            throw "invalid request";
        }
    }

};

// create form
CustomForm.prototype.create = function() {
    this.validateNew();
    return new Promise((resolve, reject) => {
        sql.query(
            'INSERT INTO CustomForm (admin_id, title, form_body) VALUES (?)',
            [[this.admin_id, this.title, this.form_body]],
            function (err, result) {
                if (err) reject(err);
                else resolve(result.insertId);
            }
        );
    });
}

// publish form
CustomForm.prototype.publish = function() {
    this.validateExisting();
    return new Promise((resolve, reject) => {
        sql.query(
            'UPDATE CustomForm SET is_final = ? WHERE form_id = ?',
            [true, this.form_id],
            function (err, rows) {
                if (err) reject(err);
                else resolve(rows[0]);
            }
        );
    })
}

// takes custom query and queries form CustomForm table
CustomForm.queryForm = function(query_params) {
    return new Promise(function(resolve, reject) {

        // construct query
        let q = new CustomFormQueryData(query_params);
        q.constructQuery();
        console.log(q);

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
