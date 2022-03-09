const form = require('../controllers/custom-form.controller');
const validationSchema = require('../validators/custom-form.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');

module.exports = (app) => {
  app.get(
    '/custom-form/get/:form_id',
    validationSchema.getCustomFormSchema,
    validationErrorHandler,
    form.getCustomForm,
  );

  app.put(
    '/custom-Form/put/:form_id',
    validationSchema.updateCustomFormSchema,
    validationErrorHandler,
    form.updateCustomForm,
  );

  app.get(
    '/custom-Form/queryAllAdminForms',
    validationErrorHandler,
    form.queryAllAdminForms
  );

  app.post(
    '/custom-form/createCustomForm',
    validationSchema.createCustomFormSchema,
    validationErrorHandler,
    form.createCustomForm,
  );

  app.post(
    '/custom-Form/publish',
    validationSchema.publishFormSchema,
    validationErrorHandler,
    form.publishForm
  );

};
