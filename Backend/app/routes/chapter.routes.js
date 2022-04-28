const chapterController = require('../controllers/chapter.controller');
const validationSchema = require('../validators/chapter.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');

module.exports = app => {
  app.get('/chapters/getAll', chapterController.getAll);

  app.post(
    '/chapters/create',
    validationSchema.createChapterSchema,
    validationErrorHandler,
    chapterController.create
  );
};