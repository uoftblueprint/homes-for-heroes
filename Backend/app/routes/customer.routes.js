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
    // isPrivileged,
    validationSchema.getUserDataSchema,
    validationErrorHandler,
    customers.getUserData,
  );

  app.get(
    '/getCustomerInfo/:user_id',
    isPrivileged,
    validationSchema.getCustomerInfoSchema,
    validationErrorHandler,
    customers.getCustomerInfo,
  );

  app.get(
    '/customers/:user_id/alertCase',
    isPrivileged,
    validationSchema.getAlertCaseSchema,
    validationErrorHandler,
    customers.getAlertCase,
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
    // isAuthenticated,
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

  app.get(
    '/getUsersInfoCSV',
    isPrivileged,
    validationSchema.getUserInfoCSVSchema,
    validationErrorHandler,
    customers.getUserInfoCSV,
  );
};
