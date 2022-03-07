const chapters = require("../controllers/chapter.controller");
const validationSchema = require("../validators/chapter.validation");
const validationErrorHandler = require('../middleware/validation-error-handler');
const passport = require('passport');

module.exports = app => {
    app.get('/chapters/getAll', chapters.getAll);
    app.post(
        '/chapters/create', 
        validationSchema.createChapterSchema,
        validationErrorHandler,
        chapters.create);
  };