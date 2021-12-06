module.exports = app => {
  const customers = require("../controllers/customer.controller");

  app.get('/customers', customers.getAllUsers);
  app.get('/customers/:user_id/alertCase', customers.getAlertCase);
  app.put('/customers/:user_id/alertCase', customers.setAlertCase);
  app.get('/getUsersInfoCSV', customers.getUserInfoCSV);
};
