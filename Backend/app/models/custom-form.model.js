const sql = require('./db.js');
const CustomFormQueryData = require("./query-models/custom-form-query-data.model");

// constructor
const CustomForm = function (body) {
    this.form_id = body.form_id
    this.admin_id = body.admin_id
    this.title = body.title
    this.curr_level = JSON.stringify(body.curr_level)
    this.form_body = JSON.stringify(body.form_body)

    this.validateNew = function() {
        if (!this.admin_id || !this.title || !this.form_body) {
            throw "invalid request, new form";
        }
    }

    this.validateExisting = function() {
        if (!this.form_id) {
            throw "invalid request, existing form";
        }
    }

};

// create form
CustomForm.prototype.create = function() {
    this.validateNew();
    return new Promise((resolve, reject) => {
        sql.query(
            'INSERT INTO CustomForm (admin_id, title, form_body, curr_level) VALUES (?)',
            [[this.admin_id, this.title, this.form_body, this.curr_level]],
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

// update form
CustomForm.prototype.update = function() {
    this.validateExisting();
    console.log("update model")
    console.log(this.title)
    console.log(this.form_id)
    console.log(this.curr_level)
    console.log(this.form_body)
    return new Promise((resolve, reject) => {
        sql.query(
            'UPDATE CustomForm SET title = ?, form_body = ?, curr_level = ? WHERE form_id = ? AND is_final = false',
            [this.title, this.form_body, this.curr_level, this.form_id],
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

        const data_query = `
        SELECT * FROM CustomForm AS form
        ${q.query}
        ORDER BY form.created_date DESC
        `;
        logger.debug(data_query);

        sql.query(data_query, function(err, row) {
            if (err) reject(err);
            resolve(row);
        });
  });
};

module.exports = CustomForm;
