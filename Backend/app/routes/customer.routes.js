const customers = require('../controllers/customer.controller');
const validationSchema = require('../validators/customer.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');
const { isAuthenticated, isPrivileged } = require('../auth/helpers');

module.exports = (app) => {
  app.get(
    '/customers',
    isPrivileged,
    customers.getAllUsers
  );

  app.get(
    '/getCases',
    isPrivileged,
    validationSchema.getCasesSchema,
    validationErrorHandler,
    customers.getCases,
  );

  app.get(
    '/getUserData',
    isPrivileged,
    validationSchema.getUserDataSchema,
    validationErrorHandler,
    customers.getUserData,
  );

  app.get(
    '/getVeteranCSV',
    isPrivileged,
    validationSchema.getCSVSchema,
    validationErrorHandler,
    customers.getCSV,
  );

  app.get(
    '/getCustomerInfo/:user_id',
    isAuthenticated,
    validationSchema.getCustomerInfoSchema,
    validationErrorHandler,
    customers.getCustomerInfo,
  );

  app.get(
    '/getCustomerInfo',
    isAuthenticated,
    customers.getSelfCustomerInfo,
  );

  app.get(
    '/customers/:user_id/alertCase',
    isPrivileged,
    validationSchema.getAlertCaseSchema,
    validationErrorHandler,
    customers.getAlertCase,
  );

  app.get(
    '/customers/:user_id/alertCaseID',
    validationSchema.getAlertCaseIDSchema,
    validationErrorHandler,
    customers.getAlertCaseID,
  );

  app.put(
    '/customers/:user_id/alertCase',
    isPrivileged,
    validationSchema.setAlertCaseSchema,
    validationErrorHandler,
    customers.setAlertCase,
  );

  app.post(
    '/updateUserInfo',
    isAuthenticated,
    validationSchema.updateUserInfoSchema,
    validationErrorHandler,
    customers.updateUserInfo,
  );

  app.patch(
    '/changePassword',
    isAuthenticated,
    validationSchema.patchChangePasswordSchema,
    validationErrorHandler,
    customers.patchChangePassword,
  );

  app.patch(
    '/changePassword',
    isAuthenticated,
    validationSchema.patchChangePasswordSchema,
    validationErrorHandler,
    customers.patchChangePassword,
  );

  app.post(
    '/deleteVeteran',
    isPrivileged,
    validationSchema.deleteVeteranSchema,
    validationErrorHandler,
    customers.deleteVeteran,
  );
  app.get(
    '/getToDo/:user_id', 
    validationSchema.getToDoSchema,
    validationErrorHandler,
    customers.getToDo
  );
  app.post(
    '/updateToDo/:user_id',
    validationSchema.putToDoSchema,
    validationErrorHandler,
    customers.updateToDo);
};
