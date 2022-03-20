const customers = require('../controllers/customer.controller');
const validationSchema = require('../validators/customer.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');
const passport = require('passport');

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
    passport.authenticate('jwt', { failureRedirect: '/login', session: false }),
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

  app.put(
    '/updateCustomerProfile/:user_id', 
    validationSchema.updateCustomerProfileSchema,
    validationErrorHandler,
    customers.updateProfile);

  app.get(
    '/getUsersInfoCSV',
    validationSchema.getUserInfoCSVSchema,
    validationErrorHandler,
    customers.getUserInfoCSV,
  );
};
