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

Customer.getCases = function(user_id, start_date, end_date) {
  return new Promise((resolve, reject) => {
      sql.query("SELECT * FROM cases WHERE user_id = ? AND date(last_update) between ? and ?", 
      [user_id, start_date, end_date],
      function(err, cases) {
          if (err) reject(err);
          if (cases.length == 0) {
            // no case data found for this user/client
            resolve([]);
          }
          if (cases.length > 0) {
            resolve(cases);
          }
      });
  });
};

module.exports = Customer;
