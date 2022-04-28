const supporterController = require('../controllers/supporter.controller');
const validationSchema = require('../validators/supporter.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');
const { isSuperAdmin } = require('../auth/helpers');

module.exports = app => {
    
  // list all supporters
  app.get(
    '/supporters',
    supporterController.getAllSupporters
  );

  app.get(
    '/supporters/getData',
    validationSchema.getDataSchema,
    validationErrorHandler,
    supporterController.getData);

  app.post(
    '/supporters/updateInfo',
    // isAuthenticated,
    validationSchema.updateInfoSchema,
    validationErrorHandler,
    supporterController.updateInfo,
  );

  // create a new supporter
  app.post(
    '/supporters/create',
    // isSuperAdmin,
    validationSchema.createSupporterSchema,
    validationErrorHandler,
    supporterController.create
  );
};
