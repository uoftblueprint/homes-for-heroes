const sql = require("./db.js");

// constructor
const Customer = function(customer) {
  this.user_id = customer.user_id;
  this.name = customer.name;
  this.email = customer.email;
  this.phone = customer.phone;
};


Customer.retrieveAll = function() {
  return new Promise(function(resolve, reject){
    sql.query('SELECT * FROM client_users', function(err, rows) {
      if (err) reject(err);
        const customers = [];
        rows.forEach((row) => {
          customers.push(new Customer(row));
        })
        resolve(customers);
    })
  })
}

Customer.getCases = function(clientId, startDate, endDate) {
  return new Promise((resolve, reject) => {
      sql.query("SELECT * FROM cases WHERE user_id = ? AND date(last_update) between ? and ?", 
      [clientId, startDate, endDate],
      function(err, cases) {
          if (err) reject(err);
          if (cases.length == 0) {
            console.log("No cases found for this client.");
          }
          if (cases.length > 0) {
            resolve(cases);
          }
      });
  });
};

module.exports = Customer;
