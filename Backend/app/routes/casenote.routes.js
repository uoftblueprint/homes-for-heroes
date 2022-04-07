const caseNoteController = require('../controllers/casenote.controller');
const validationSchema = require('../validators/casenote.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');

module.exports = (app) => {
  app.post(
    '/casenote',
    validationSchema.createSchema,
    validationErrorHandler,
    caseNoteController.create,
  );
  app.put(
    '/casenote/:case_id/update', 
    validationSchema.putSchema,
    validationErrorHandler,
    caseNoteController.update
  );
  app.delete(
    '/casenote/:case_id', 
    validationSchema.deleteSchema,
    validationErrorHandler,
    caseNoteController.delete
  );
};
