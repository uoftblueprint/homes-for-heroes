const sql = require("./db.js");

// constructor
const Customer = function(customer) {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};


Customer.retrieveAll = function() {
  return new Promise(function(resolve, reject){
    sql.query('SELECT * FROM client_users', function(err, rows) {
      if (err) throw err;
        const customers = rows;
        // call constructor here?
        // rows.forEach((row) => {
        //   customers.push(new Customer(row));
        // })
        resolve(customers);
    })
  })
}

module.exports = Customer;
