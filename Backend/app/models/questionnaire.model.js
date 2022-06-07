const sql = require('./db.js');
const QuestionnaireQueryData = require('./query-models/questionnaire-query-data.model');

// constructor
const Questionnaire = function (body) {
  this.questionnaire = body.questionnaire_id;
  this.form_id = body.form_id;
  this.user_id = body.user_id;
  this.title = body.title;
  this.created_date = body.created_date;
  this.form_body = JSON.stringify(body.form_body); 
};

// create Questionnaire
Questionnaire.prototype.create = function() {
  return new Promise((resolve, reject) => {
    sql.query(
      'INSERT INTO Questionnaire (user_id, form_id, created_date, form_body) VALUES (?, ?, ?, ?)',
      [this.user_id, this.form_id, this.created_date, this.form_body],
      (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      },
    );
  });
};

Questionnaire.getQuestionnaire = function(questionnaire_id) {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT questionnaire.*, f.title, f.curr_level, u.name 
      FROM Questionnaire AS questionnaire
      LEFT JOIN CustomForm AS f ON questionnaire.form_id = f.form_id
      LEFT JOIN client_users AS u ON questionnaire.user_id = u.user_id
      WHERE questionnaire_id = ?`,
      [questionnaire_id],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

// takes custom query and queries Form CustomForm table
Questionnaire.queryUserQuestionnaires = function(query_params) {
  return new Promise((resolve, reject) => {
    // construct query
    const q = new QuestionnaireQueryData(query_params);
    q.constructQuery();

    const data_query = `
            SELECT questionnaire.*, f.title
            FROM Questionnaire AS questionnaire
            LEFT JOIN CustomForm AS f ON questionnaire.form_id = f.form_id
                ${q.query}
        `;

    sql.query(data_query, q.queryArray, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

module.exports = Questionnaire;