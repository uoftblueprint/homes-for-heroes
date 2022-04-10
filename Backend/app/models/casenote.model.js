const sql = require('./db.js');

// constructor
const CaseNote = function (caseNote) {
  this.user_id = caseNote.user_id;
  this.admin_id = caseNote.admin_id;
  this.notes = caseNote.notes;
  this.title = caseNote.title;
  this.category = caseNote.category;
};

CaseNote.prototype.create = function () {
  return new Promise((resolve, reject) => {
    if (
      this.user_id === undefined ||
      this.admin_id === undefined ||
      this.notes === undefined ||
      this.title === undefined ||
      this.category === undefined
    ) {
      reject('Incomplete case note');
      return;
    }
    sql.query(
      'INSERT INTO cases (user_id, admin_id, notes, title, category) VALUES (?, ?, ?, ?, ?)',
      [this.user_id, this.admin_id, this.notes, this.title, this.category],
      (err, result) => {
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
      (err, rows) => {
        if (err) reject(err);
        resolve(new CaseNote(rows[0]));
      },
    );
  });
};

CaseNote.updateNote = function (case_id, new_note, new_title) {
  return new Promise((resolve, reject) => {
    sql.query(
      'UPDATE cases SET notes = ?, title = ? WHERE case_id = ?',
      [new_note, new_title, case_id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result.case_id);
      }
    );
  });
};

CaseNote.deleteNote = function (case_id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'DELETE FROM cases WHERE case_id = ?',
      [case_id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result.case_id);
      }
    );
  });
};

module.exports = CaseNote;
