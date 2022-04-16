const volunteerController = require('../controllers/volunteer.controller');
const validationSchema = require('../validators/volunteer.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');
const { isSuperAdmin } = require('../auth/helpers');

module.exports = (app) => {
  // list all volunteers
  app.get('/volunteers', volunteerController.getAllVolunteers);

  // create a new volunteer
  app.post(
    '/volunteers/create',
    isSuperAdmin,
    validationSchema.createVolunteerSchema,
    validationErrorHandler,
    volunteerController.create
  );

  app.get(
    '/volunteers/:name',
    validationSchema.getVolunteerSchema,
    validationErrorHandler,
    volunteerController.getVolunteerByName
  );

  app.put(
    '/volunteers/update/:volunteer_id',
    validationSchema.updateVolunteerSchema,
    validationErrorHandler,
    volunteerController.updateInfo
  );
};
