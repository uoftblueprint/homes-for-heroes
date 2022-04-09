const supporter = require("../controllers/supporter.controller");
const validationSchema = require('../validators/supporter.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');

module.exports = app => {
    
    // list all supporters
    app.get(
        '/supporters', 
        supporter.getAllSupporters);
    
    // create a new supporter
    app.post(
        '/supporters/create', 
        validationSchema.createSupporterSchema,
        validationErrorHandler,
        supporter.create);
    
    app.get(
        '/supporters/getData',
        validationSchema.getDataSchema,
        validationErrorHandler,
        supporter.getData);

    app.post(
        '/supporters/updateInfo',
        // isAuthenticated,
        validationSchema.updateInfoSchema,
        validationErrorHandler,
        supporter.updateInfo,
    );
  };
  