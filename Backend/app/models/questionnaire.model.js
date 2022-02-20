const sql = require('./db.js');

// constructor
const Questionnaire = function (body) {
    this.questionnaire_id = body.questionnaire_id
    this.admin_id = body.admin_id
    this.form_id = body.form_id
    this.user_id = body.user_id
    this.form_body = JSON.stringify(body.form_body)

    this.validateNew = function () {
        if (!this.admin_id || !this.user_id || !this.form_body) {
            throw "invalid request, incomplete questionnaire";
        }
    }

    this.validateExisting = function () {
        if (!this.questionnaire_id) {
            throw "invalid request, existing form response";
        }
    }

};

// create questionnaire
Questionnaire.prototype.create = function () {
    this.validateNew();
    return new Promise((resolve, reject) => {
        sql.query(
            'INSERT INTO Questionnaires (admin_id, form_id, user_id, form_body) VALUES (?)',
            [[this.admin_id, this.form_id, this.user_id, this.form_body]],
            function (err, result) {
                if (err) reject(err);
                else resolve(result.insertId);
            }
        );
    });
}

// submit questionnaire
CustomForm.prototype.publish = function () {
    this.validateExisting();
    return new Promise((resolve, reject) => {
        sql.query(
            'UPDATE Questionnaire SET is_completed = ? WHERE questionnaire_id = ?',
            [true, this.questionnaire_id],
            function (err, rows) {
                if (err) reject(err);
                else resolve(rows[0]);
            }
        );
    })
}

// update questionnaire
Questionnaire.prototype.update = function () {
    this.validateExisting();
    return new Promise((resolve, reject) => {
        sql.query(
            'UPDATE Questionnaires SET form_body = ? WHERE questionnaire_id = ? AND is_final = false',
            [this.form_body, this.questionnaire_id],
            function (err, rows) {
                if (err) reject(err);
                else resolve(rows[0]);
            }
        );
    })
}

// query questionnaire
CustomForm.queryForm = function (query_params) {
    return new Promise(function (resolve, reject) {

        // construct query
        let q = new QuestQueryData(query_params);
        q.constructQuery();

        const data_query = `
        SELECT * FROM Questionnaires AS questionnaire
        ${q.query}
        ORDER BY questionnaire.last_updated DESC
        `

        sql.query(data_query, function (err, row) {
            if (err) reject(err);
            resolve(row);
        });

    });
}

module.export = Questionnaire;