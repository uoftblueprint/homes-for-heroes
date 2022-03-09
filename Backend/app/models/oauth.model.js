const sql = require('./db.js');

const OAuth = function (oauth) {
  this.user_id = oauth.user_id;
  this.provider = oauth.provider;
  this.subject = oauth.subject;
};

OAuth.create = function (user_id, provider, subject) {
  return new Promise((resolve, reject) => {
    sql.query(
      'INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)',
      [user_id, provider, subject],
      (err) => {
        if (err) reject(err);
        else resolve(this);
      },
    );
  });
};

OAuth.getUserId = function (provider, subject) {
  return new Promise((resolve, reject) => {
    sql.query(
      'SELECT user_id FROM federated_credentials WHERE provider = ? AND subject = ?',
      [provider, subject],
      (err, rows) => {
        if (err) reject(err);
        else if (rows.length === 0) resolve(-1);
        else resolve(rows[0].user_id);
      },
    );
  });
};

module.exports = OAuth;
