const form = require('../controllers/custom-form.controller');
const validationSchema = require('../validators/custom-form.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');

<<<<<<< HEAD
module.exports = (app) => {
  app.get(
    '/custom-form/get/:form_id',
    validationSchema.getCustomFormSchema,
    validationErrorHandler,
    form.getCustomForm,
  );
=======
    app.get('/custom-form/get/:form_id', form.getCustomForm);
    app.put('/custom-form/put/:form_id', form.updateCustomForm);
    app.get('/custom-form/queryAllAdminForms/:admin_id', form.queryAllAdminForms);
    app.post('/custom-form/createCustomForm', form.createCustomForm);
    app.post('/custom-form/publish', form.publishForm);
>>>>>>> 1bb9f99 (form create, edit, and view)

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
