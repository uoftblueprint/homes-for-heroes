const { body, param, query } = require('express-validator');

const validationSchema = {
    createChapterSchema: [
        body('name').trim().notEmpty(),
    ],
}

module.exports = validationSchema;