const sql = require('./db.js');
const VolunteerQueryData = require('./query-models/volunteer-query-data.model.js');
const logger = require('../logger');

const Volunteer = function (body) {
  this.name = body.name;
  this.village = body.village;
  this.date_joined = body.date_joined;
  this.role = body.role;
  this.phone = body.phone;
  this.email = body.email;
};

// add new volunteer
Volunteer.prototype.create = function() {
  return new Promise((resolve, reject) => {
    sql.query('INSERT INTO volunteers (name, village, date_joined, role, phone, email) VALUES (?)',
      [[this.name, this.village, this.date_joined, this.role, this.phone, this.email]],
      (err, results) => {
        if (err) reject (err);
        else resolve(results.insertId);
      });
  });
};

// list all volunteers
Volunteer.listAll = function () {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * FROM volunteers', 
      (err, rows) => {
        if (err) reject (err);
        else {
          resolve(rows);
        }
      });
  });
};

Volunteer.queryData = function (query_params) {
    return new Promise((resolve, reject) => {
      const q = new VolunteerQueryData(query_params);
      q.constructQuery();
      const page_query =`SELECT COUNT(*) AS count FROM volunteers ${q.query}`
      const data_query = ` 
      SELECT
        volunteers.volunteer_id, volunteers.name, volunteers.village, volunteers.date_joined, volunteers.role, volunteers.phone, volunteers.email
      FROM volunteers 
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

Volunteer.updateInfo = function (user_id, query_params) {
  return new Promise((resolve, reject) => {
    const q = new VolunteerQueryData(query_params);
    q.constructEditQuery();
    const data_query = `   
    UPDATE volunteers
    ${q.query}
    WHERE volunteer_id = ${user_id} 
    `;
    sql.query(data_query, (error, info) => {
      if (error) reject(error);
      resolve(info)
    });
  });
};

Volunteer.delete = function (user_id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'DELETE FROM volunteers WHERE volunteer_id = ?',
      [user_id],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows[0]);
      },
    );
  });
};

Volunteer.getCSV = function (query_params) {
  return new Promise((resolve, reject) => {
    const q = new VolunteerQueryData(query_params);
    q.constructQuery();
    const data_query = ` 
      SELECT
        volunteers.volunteer_id, volunteers.name, volunteers.village, volunteers.date_joined, volunteers.role, volunteers.phone, volunteers.email
      FROM volunteers 
        ${q.query}
      `;
    sql.query(data_query, (err, row) => {
      if (err) reject(err);
        resolve(row)
    }); 
  });
};``

module.exports = Volunteer;