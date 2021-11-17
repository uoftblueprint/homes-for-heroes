const sql = require('./db.js');

// constructor
const CaseNote = function (caseNote) {
  this.user_id = caseNote.user_id;
  this.admin_id = caseNote.admin_id;
  this.notes = caseNote.notes;
};

CaseNote.create = function () {
  return new Promise(function (resolve, reject) {
    if (
      this.user_id == undefined ||
      this.admin_id == undefined ||
      this.notes == undefined
    ) {
      reject('Incomplete case note');
      return;
    }
    sql.query(
      'INSERT INTO cases (user_id, admin_id, notes)',
      [this.user_id, this.admin_id, this.notes],
      function (err, result) {
        if (err) reject(err);
        else resolve(result.insertId); // Return the case_id
      }
    );
  });
};

module.exports = CaseNote;
