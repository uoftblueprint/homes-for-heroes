module.exports = app => {
  const customers = require("../controllers/customer.controller");

  app.get('/customers', customers.getAllUsers);
  app.get('/customers/alertCase', customers.getAlertCase);
  app.put('/customers/alertCase', customers.setAlertCase);
};
