const sql = require('./db.js');
logger.debug(req.body);

// constructor
const Supporter = function (body) {
    this.name = body.name;
    this.date_gifted = body.date_gifted;
    this.gift_provided = body.gift_provided;
    this.phone = body.phone;
};

// add new supporter
Supporter.prototype.create = function() {
    return new Promise((resolve, reject) => {
        sql.query('INSERT INTO supporters (name, date_gifted, gift_provided, phone) VALUES (?)',
        [[this.name, this.date_gifted, this.gift_provided, this.phone]],
        function(err, results) {
            if (err) reject (err);
            else resolve(results.insertId);
        });
    });
}

// list all supporters
Supporter.listAll = function () {
    return new Promise(function (resolve, reject) {
        sql.query('SELECT * FROM supporters', 
        function (err, rows) {
            if (err) reject (err);
            else {
                resolve(rows);
            }
        });
    });
};

module.exports = Supporter;