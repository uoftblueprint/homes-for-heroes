const supporterController = require('../controllers/supporter.controller');
const validationSchema = require('../validators/supporter.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');
const { isSuperAdmin } = require('../auth/helpers');
const partnerController = require('../controllers/partner.controller');

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
    supporterController.getData
    );

  app.get(
    '/supporters/getCSV',
    validationSchema.getCSVSchema,
    validationErrorHandler,
    supporterController.getCSV
    );

  app.post(
    '/supporters/updateInfo',
    isSuperAdmin,
    validationSchema.updateInfoSchema,
    validationErrorHandler,
    supporterController.updateInfo,
  );

  // create a new supporter
  app.post(
    '/supporters/create',
    isSuperAdmin,
    validationSchema.createSupporterSchema,
    validationErrorHandler,
    supporterController.create
  );
  
  app.post(
    '/supporters/delete',
    isSuperAdmin,
    validationSchema.deleteSchema,
    validationErrorHandler,
    supporterController.delete,
  );
};
