const sql = require('./db.js');
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

// search for and list a specific partner
Partner.getPartner = function (partner_name) {
    return new Promise((resolve, reject) => {
        sql.query('SELECT * FROM partners WHERE org_name = ? LIMIT 1',
        [partner_name],
        (err, rows) => {
            if (err) reject(err);
            else if (!rows[0]) reject(new Error('Partner not found'));
            else resolve(rows[0]);
        },
        );
    });
};

module.exports = Partner;