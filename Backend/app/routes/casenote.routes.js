const caseNoteController = require('../controllers/casenote.controller');
const validationSchema = require('../validators/casenote.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');
const { isPrivileged } = require('../auth/helpers');

module.exports = (app) => {
  app.post(
    '/casenote',
    isPrivileged,
    validationSchema.createSchema,
    validationErrorHandler,
    caseNoteController.create,
  );
  app.put(
    '/casenote/:case_id/update',
    isPrivileged,
    validationSchema.putSchema,
    validationErrorHandler,
    caseNoteController.update
  );
  app.delete(
    '/casenote/:case_id',
    isPrivileged,
    validationSchema.deleteSchema,
    validationErrorHandler,
    caseNoteController.delete
  );
};
