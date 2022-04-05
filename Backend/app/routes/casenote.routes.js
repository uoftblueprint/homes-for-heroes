const caseNoteController = require('../controllers/casenote.controller');
const { createSchema } = require('../validators/casenote.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');

module.exports = (app) => {
  app.post(
    '/casenote',
    createSchema,
    validationErrorHandler,
    caseNoteController.create,
  );
  // to do update theses
  app.put(
    '/casenote/:case_id/update', 
    createSchema,
    validationErrorHandler,
    caseNoteController.update
  );
  app.delete(
    '/casenote/:case_id', 
    createSchema,
    validationErrorHandler,
    caseNoteController.delete
  );
};
