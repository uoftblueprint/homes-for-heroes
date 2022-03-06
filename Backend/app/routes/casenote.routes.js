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
};
