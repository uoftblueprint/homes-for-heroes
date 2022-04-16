const supporterController = require('../controllers/supporter.controller');
const validationSchema = require('../validators/supporter.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');
const { isSuperAdmin } = require('../auth/helpers');

module.exports = (app) => {
  // list all supporters
  app.get('/supporters', supporterController.getAllSupporters);

  // create a new supporter
  app.post(
    '/supporters/create',
    isSuperAdmin,
    validationSchema.createSupporterSchema,
    validationErrorHandler,
    supporterController.create
  );

  app.get(
    '/supporters/:name',
    validationSchema.getSupporterSchema,
    validationErrorHandler,
    supporterController.getSupporterByName
  );

  app.put(
    '/supporters/update/:supporter_id',
    validationSchema.updateSupporterSchema,
    validationErrorHandler,
    supporterController.updateInfo
  );
};
