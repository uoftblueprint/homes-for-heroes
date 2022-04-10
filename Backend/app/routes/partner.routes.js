const validationSchema = require('../validators/partner.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');
const partner = require('../controllers/partner.controller');
const { isSuperAdmin } = require('../auth/helpers');

module.exports = app => {
  // list all partners
  app.get(
    '/partners', 
    partner.getAllPartners
  );
    
  // create a new partner
  app.post(
    '/partners/create',
    isSuperAdmin,
    validationSchema.createPartnerSchema,
    validationErrorHandler,
    partner.create
  );
};
  