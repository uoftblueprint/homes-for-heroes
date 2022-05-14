const sql = require('./db.js');
const PartnerQueryData = require('./query-models/partner-query-data.model.js');
const logger = require('../logger');

// constructor for partners 
const Partner = function (body) {
  this.name = body.name;
  this.city = body.city;
  this.village = body.village;
  this.address = body.address;
  this.phone = body.phone;
  this.email = body.email;
};

// add new partner
Partner.prototype.create = function() {
  return new Promise((resolve, reject) => {
    sql.query('INSERT INTO partners (org_name, city, village, address, phone, email) VALUES (?)',
      [[this.name, this.city, this.village, this.address, this.phone, this.email]],
      (err, results) => {
        if (err) reject (err);
        else resolve(results.insertId);
      });
  });
};

// list all partners
Partner.listAll = function () {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * FROM partners', 
      (err, rows) => {
        if (err) reject (err);
        else {
          resolve(rows);
        }
      });
  });
};

Partner.queryData = function (query_params) {
  return new Promise((resolve, reject) => {
    const q = new PartnerQueryData(query_params);
    q.constructQuery();
    const page_query =`SELECT COUNT(*) AS count FROM partners ${q.query}`
    const data_query = ` 
    SELECT
      partners.partner_id, partners.org_name, partners.city, partners.village, partners.address, partners.phone, partners.email
    FROM partners 
      ${q.query}
    LIMIT ${q.offset}, ${q.limit}
    `;
    sql.query(data_query, (err, row) => {
      if (err) reject(err);
      page_count = row
    }); 
    sql.query(page_query, (error, page) => { 
      if (error) reject(error);
      sql.query(data_query, (err, row) => {
        if (err) reject(err);
          resolve([page[0],row])
      }); 
    });
  });
};

Partner.updateInfo = function (user_id, query_params) {
  return new Promise((resolve, reject) => {
    const q = new PartnerQueryData(query_params);
    q.constructEditQuery();
    const data_query = `   
    UPDATE partners 
    ${q.query}
    WHERE partner_id = ${user_id} 
    `;
    sql.query(data_query, (error, info) => { 
      if (error) reject(error); 
        resolve(info)
    });
  });
};

Partner.delete = function (user_id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'DELETE FROM partners WHERE partner_id = ?',
      [user_id],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows[0]);
      },
    );
  });
};

Partner.getCSV = function (query_params) {
  return new Promise((resolve, reject) => {
    const q = new PartnerQueryData(query_params);
    q.constructQuery();
    const data_query = ` 
    SELECT
      partners.partner_id, partners.org_name, partners.city, partners.village, partners.address, partners.phone, partners.email
    FROM partners 
      ${q.query}
    `;
    sql.query(data_query, (err, row) => {
      if (err) reject(err);
        resolve(row)
    }); 
  });
};

module.exports = Partner;