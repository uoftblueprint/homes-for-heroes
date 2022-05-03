const volunteerController = require('../controllers/volunteer.controller');
const validationSchema = require('../validators/volunteer.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');
const { isSuperAdmin } = require('../auth/helpers');

module.exports = app => {
    
  // list all volunteers
  app.get(
    '/volunteers',
    volunteerController.getAllVolunteers
  );

  app.get(
    '/volunteers/getData',
    validationSchema.getDataSchema,
    validationErrorHandler,
    volunteerController.getData
    );

  app.get(
    '/volunteers/getCSV',
    validationSchema.getCSVSchema,
    validationErrorHandler,
    volunteerController.getCSV
    );

  app.post(
    '/volunteers/updateInfo',
    isSuperAdmin,
    validationSchema.updateInfoSchema,
    validationErrorHandler,
    volunteerController.updateInfo,
  );

  // create a new volunteer
  app.post(
    '/volunteers/create',
    isSuperAdmin,
    validationSchema.createVolunteerSchema,
    validationErrorHandler,
    volunteerController.create
  );

  app.post(
    '/volunteers/delete',
    isSuperAdmin,
    validationSchema.deleteSchema,
    validationErrorHandler,
    volunteerController.delete,
  );
};
  