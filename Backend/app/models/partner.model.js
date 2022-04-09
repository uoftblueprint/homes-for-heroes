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
};

// add new partner
Partner.prototype.create = function() {
    return new Promise((resolve, reject) => {
        sql.query('INSERT INTO partners (org_name, city, village, address, phone) VALUES (?)',
        [[this.name, this.city, this.village, this.address, this.phone]],
        function(err, results) {
            if (err) reject (err);
            else resolve(results.insertId);
        });
    });
}

// list all partners
Partner.listAll = function () {
    return new Promise(function (resolve, reject) {
        sql.query('SELECT * FROM partners', 
        function (err, rows) {
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
      partners.partner_id, partners.org_name, partners.city, partners.village, partners.address, partners.phone
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

module.exports = Partner;