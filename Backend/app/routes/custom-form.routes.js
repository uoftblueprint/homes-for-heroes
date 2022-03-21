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

  app.post(
    '/custom-form/createCustomForm',
    validationSchema.createCustomFormSchema,
    validationErrorHandler,
    form.createCustomForm,
  );
  app.get(
    '/custom-form/queryCustomForms',
    validationSchema.queryCustomForms,
    validationErrorHandler,
    form.queryCustomForms,
  );
};
