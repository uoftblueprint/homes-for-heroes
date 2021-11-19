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

module.exports = Customer;
