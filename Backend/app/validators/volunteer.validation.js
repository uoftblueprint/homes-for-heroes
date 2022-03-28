const { body, query, param } = require('express-validator');

const validationSchema = {
    createVolunteerSchema: [
        body('name').trim().notEmpty(),
        body('date_joined').isDate({ format: 'YYYY-MM-DD' }).withMessage('date_joined must be in format YYYY-MM-DD'),
    ],
    getVolunteerSchema: [
        param('name').trim().notEmpty(),
    ],
};

module.exports = validationSchema;