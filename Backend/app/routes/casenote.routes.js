const caseNoteController = require('../controllers/casenote.controller');
const { createSchema } = require('../validators/casenote.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');
const { isPrivileged } = require('../auth/helpers');

module.exports = (app) => {
  app.post(
    '/casenote',
    isPrivileged,
    createSchema,
    validationErrorHandler,
    caseNoteController.create,
  );
};
