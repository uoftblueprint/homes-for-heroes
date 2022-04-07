const { body, query, param } = require('express-validator');

const volunteerInfoSchema = [
    body('name').trim().notEmpty(),
    body('date_joined').isDate({ format: 'YYYY-MM-DD' }).withMessage('date_joined must be in format YYYY-MM-DD'),
],

const volunteerId = [
    query('volunteer_id').isInt({ min: 0 }).withMessage('Invalid volunteer_id'),
]

const validationSchema = {
    createVolunteerSchema: [...volunteerInfoSchema],
    getVolunteerSchema: [
        param('name').trim().notEmpty(),
    ],
    updateVolunteerSchema: [...volunteerInfoSchema, ...volunteerId],
};

module.exports = validationSchema;