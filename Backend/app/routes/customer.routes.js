const customers = require('../controllers/customer.controller');
const validationSchema = require('../validators/customer.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');
const { isAuthenticated } = require('../auth/helpers');

module.exports = (app) => {
  app.get('/customers', customers.getAllUsers);

  app.get(
    '/getCases',
    validationSchema.getCasesSchema,
    validationErrorHandler,
    customers.getCases,
  );

  app.get(
    '/getUserData',
    validationSchema.getUserDataSchema,
    validationErrorHandler,
    customers.getUserData,
  );

  app.get(
    '/getCustomerInfo/:user_id',
    validationSchema.getCustomerInfoSchema,
    validationErrorHandler,
    customers.getCustomerInfo,
  );

  app.get(
    '/customers/:user_id/alertCase',
    validationSchema.getAlertCaseSchema,
    validationErrorHandler,
    customers.getAlertCase,
  );

  app.put(
    '/customers/:user_id/alertCase',
    validationSchema.setAlertCaseSchema,
    validationErrorHandler,
    customers.setAlertCase,
  );

  app.get(
    '/getUsersInfoCSV',
    validationSchema.getUserInfoCSVSchema,
    validationErrorHandler,
    customers.getUserInfoCSV,
  );
};
