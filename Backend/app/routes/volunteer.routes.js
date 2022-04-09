const volunteer = require("../controllers/volunteer.controller");
const validationSchema = require('../validators/volunteer.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');

module.exports = app => {
    
    // list all volunteers
    app.get(
        '/volunteers', 
        volunteer.getAllVolunteers);

    // create a new volunteer
    app.post(
        '/volunteers/create', 
        validationSchema.createVolunteerSchema,
        validationErrorHandler,
        volunteer.create);

    app.get(
        '/volunteers/getData',
        validationSchema.getDataSchema,
        validationErrorHandler,
        volunteer.getData);

    app.post(
        '/volunteers/updateInfo',
        // isAuthenticated,
        validationSchema.updateInfoSchema,
        validationErrorHandler,
        volunteer.updateInfo,
    );
};
  