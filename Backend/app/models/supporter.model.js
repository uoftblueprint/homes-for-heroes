const sql = require('./db.js');
const SupporterQueryData = require('./query-models/supporter-query-data.model.js');
const logger = require('../logger');

// constructor
const Supporter = function (body) {
  this.name = body.name;
  this.date_gifted = body.date_gifted;
  this.gift_provided = body.gift_provided;
  this.phone = body.phone;
  this.email = body.email;
};

// add new supporter
Supporter.prototype.create = function() {
  return new Promise((resolve, reject) => {
    sql.query('INSERT INTO supporters (name, date_gifted, gift_provided, phone, email) VALUES (?)',
      [[this.name, this.date_gifted, this.gift_provided, this.phone, this.email]],
      (err, results) => {
        if (err) reject (err);
        else resolve(results.insertId);
      });
  });
};

// list all supporters
Supporter.listAll = function () {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * FROM supporters', 
      (err, rows) => {
        if (err) reject (err);
        else {
          resolve(rows);
        }
      });
  });
};

Supporter.queryData = function (query_params) {
    return new Promise((resolve, reject) => {
      const q = new SupporterQueryData(query_params);
      q.constructQuery();
      const page_query =`SELECT COUNT(*) AS count FROM supporters ${q.query}`
      const data_query = ` 
      SELECT
        supporters.supporter_id, supporters.name, supporters.date_gifted, supporters.gift_provided, supporters.phone, supporters.email
      FROM supporters 
        ${q.query}
      LIMIT ${q.offset}, ${q.limit}
      `; 
      sql.query(page_query, q.queryArray, (error, page) => { 
        if (error) reject(error);
        sql.query(data_query, q.queryArray, (err, row) => {
          if (err) reject(err);
            resolve([page[0],row])
        }); 
      });
    });
  };

Supporter.updateInfo = function (user_id, query_params) {
  return new Promise((resolve, reject) => {
    const q = new SupporterQueryData(query_params);
    q.constructEditQuery();
    const data_query = `   
    UPDATE supporters 
    ${q.query}
    WHERE supporter_id = ${user_id} 
    `;
    sql.query(data_query, q.queryArray, (error, info) => {
      if (error) reject(error);
      resolve(info)
    });
  });
};

Supporter.delete = function (user_id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'DELETE FROM supporters WHERE supporter_id = ?',
      [user_id],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows[0]);
      },
    );
  });
};

Supporter.getCSV = function (query_params) {
  return new Promise((resolve, reject) => {
    const q = new SupporterQueryData(query_params);
    q.constructQuery();
    const data_query = ` 
      SELECT
        supporters.supporter_id, supporters.name, supporters.date_gifted, supporters.gift_provided, supporters.phone, supporters.email
      FROM supporters 
        ${q.query}
      `;
    sql.query(data_query, q.queryArray, (err, row) => {
      if (err) reject(err);
        resolve(row)
    }); 
  });
};``

module.exports = Supporter;