const { body, query, param } = require('express-validator');

const validationSchema = {
    createSupporterSchema: [
        body('name').trim().notEmpty(),
        body('date_gifted').isDate({ format: 'YYYY-MM-DD' }).withMessage('date_gifted must be in format YYYY-MM-DD'),
        body('gift_provided').trim().notEmpty(),
    ],
};

module.exports = validationSchema;