const chapterController = require('../controllers/chapter.controller');
const validationSchema = require('../validators/chapter.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');
const { isSuperAdmin } = require('../auth/helpers');

module.exports = app => {
  app.get('/chapters/getAll', chapterController.getAll);

  app.post(
    '/chapters/create',
    isSuperAdmin,
    validationSchema.createChapterSchema,
    validationErrorHandler,
    chapterController.create
  );
};