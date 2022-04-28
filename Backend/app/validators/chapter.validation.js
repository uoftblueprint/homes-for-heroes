const { body } = require('express-validator');

const validationSchema = {
  createChapterSchema: [body('name').trim().notEmpty()],
};

module.exports = validationSchema;
