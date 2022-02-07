const sql = require('./db.js');

// constructor
const CaseNote = function (caseNote) {
  this.user_id = caseNote.user_id;
  this.admin_id = caseNote.admin_id;
  this.notes = caseNote.notes;
};

CaseNote.prototype.create = function () {
  return new Promise((resolve, reject) => {
    if (
      this.user_id == undefined ||
      this.admin_id == undefined ||
      this.notes == undefined
    ) {
      reject('Incomplete case note');
      return;
    }
    sql.query(
      'INSERT INTO cases (user_id, admin_id, notes) VALUES (?)',
      [[this.user_id, this.admin_id, this.notes]],
      function (err, result) {
        if (err) reject(err);
        else resolve(result.insertId); // Return the case_id
      },
    );
  });
};

CaseNote.getById = function (case_id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT * FROM cases WHERE case_id = ?',
      [case_id],
      function (err, rows) {
        if (err) reject(err);
        resolve(new CaseNote(rows[0]));
      },
    );
  });
};

module.exports = CaseNote;
