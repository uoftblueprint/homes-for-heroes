const validationSchema = require("../validators/partner.validation");
const validationErrorHandler = require("../middleware/validation-error-handler");
const partner = require("../controllers/partner.controller");

module.exports = (app) => {
  // list all partners
  app.get("/partners", partner.getAllPartners);

  // create a new partner
  app.post(
    "/partners/create",
    validationSchema.createPartnerSchema,
    validationErrorHandler,
    partner.create
  );

  app.get(
    "/partners/:name",
    validationSchema.getPartnerSchema,
    validationErrorHandler,
    partner.getPartner
  );

  app.put(
    "/partners/update/:partner_id",
    validationSchema.updatePartnerSchema,
    validationErrorHandler,
    partner.updateInfo
  )
};