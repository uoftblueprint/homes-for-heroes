const partnerController = require('../controllers/partner.controller');
const validationSchema = require('../validators/partner.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');
const { isSuperAdmin } = require('../auth/helpers');

module.exports = app => {
  // list all partners
  app.get(
    '/partners', 
    partnerController.getAllPartners
  );

  app.get(
    '/partners/getData',
    validationSchema.getDataSchema,
    validationErrorHandler,
    partnerController.getData);

  app.post(
    '/partners/updateInfo',
    // isAuthenticated,
    validationSchema.updateInfoSchema,
    validationErrorHandler,
    partnerController.updateInfo,
  );

  // create a new partner
  app.post(
    '/partners/create',
    // isSuperAdmin,
    validationSchema.createPartnerSchema,
    validationErrorHandler,
    partnerController.create
  );
};
  