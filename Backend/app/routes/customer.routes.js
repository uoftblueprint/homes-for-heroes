module.exports = app => {
  const customers = require("../controllers/customer.controller.js");

  app.get('/customers', customers.getAllUsers);

};
