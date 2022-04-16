const validationSchema = require('../validators/partner.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');
const partnerController = require('../controllers/partner.controller');
const { isSuperAdmin } = require('../auth/helpers');

module.exports = (app) => {
  // list all partners
  app.get(
    '/partners', 
    partnerController.getAllPartners
  );
    
  // create a new partner
  app.post(
    '/partners/create',
    isSuperAdmin,
    validationSchema.createPartnerSchema,
    validationErrorHandler,
    partnerController.create
  );

  app.get(
    '/partners/:name',
    validationSchema.getPartnerSchema,
    validationErrorHandler,
    partnerController.getPartnerByName
  );

  app.put(
    '/partners/update/:partner_id',
    validationSchema.updatePartnerSchema,
    validationErrorHandler,
    partnerController.updateInfo
  );
};

  
