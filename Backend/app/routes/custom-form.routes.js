const formController = require('../controllers/custom-form.controller');
const validationSchema = require('../validators/custom-form.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');
const { isAuthenticated, isPrivileged } = require('../auth/helpers');

module.exports = (app) => {
  app.get(
    '/custom-form/get/:form_id',
    isAuthenticated,
    validationSchema.getCustomFormSchema,
    validationErrorHandler,
    formController.getCustomForm,
  );

  app.put(
    '/custom-Form/put/:form_id',
    isAuthenticated,
    validationSchema.updateCustomFormSchema,
    validationErrorHandler,
    formController.updateCustomForm,
  );

  app.get(
    '/custom-Form/queryAllAdminForms',
    // isPrivileged,
    validationErrorHandler,
    formController.queryAllAdminForms
  );

  app.post(
    '/custom-form/createCustomForm',
    isPrivileged,
    validationSchema.createCustomFormSchema,
    validationErrorHandler,
    formController.createCustomForm,
  );

  app.post(
    '/custom-Form/publish',
    isPrivileged,
    validationSchema.publishFormSchema,
    validationErrorHandler,
    formController.publishForm
  );

};