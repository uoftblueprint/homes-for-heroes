const sql = require('./db.js');

const Chapter = function (body) {
  this.name = body.name;
};

Chapter.prototype.create = function() {
  return new Promise((resolve, reject) => {
    sql.query('INSERT INTO chapters (chapter_name) VALUES (?)', [this.name],
      (err, results) => {
        if (err) reject (err);
        else resolve(results.insertId);
      });
  });
};

Chapter.listAll = function() {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * FROM chapters', (err, chapters) => {
      if (err) reject (err);
      else {
        resolve(chapters);
      }
    });
  });
};

Chapter.getId = function(chapter_name) {
  return new Promise((resolve, reject) => {
    sql.query('SELECT chapter_id from chapters where chapter_name = ?', [chapter_name], (err, results) => {
      if (err) reject (err);
      else {
        resolve(results[0].chapter_id);
      }
    });
  });
};

module.exports = Chapter;