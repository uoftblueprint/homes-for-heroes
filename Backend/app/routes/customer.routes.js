module.exports = app => {
  const customers = require("../controllers/customer.controller");

  app.get('/customers', customers.getAllUsers);
  app.get('/getCases', customers.getCases);
  app.get('/getUserData', customers.getUserData);
  app.get('/getCustomerInfo/:user_id', customers.getCustomerInfo);
  app.get('/customers/:user_id/alertCase', customers.getAlertCase);
  app.put('/customers/:user_id/alertCase', customers.setAlertCase);
<<<<<<< HEAD
  app.put('/updateCustomerProfile/:user_id', customers.updateProfile);
=======
  app.get('/getUsersInfoCSV', customers.getUserInfoCSV);
>>>>>>> 45cfa0504a9a46025b287449d296a94834bac2d4
};
