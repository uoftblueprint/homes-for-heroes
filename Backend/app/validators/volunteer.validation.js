const { body, param } = require('express-validator');

const volunteerInfoSchema = [
  body('name').trim().notEmpty(),
  body('date_joined')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('date_joined must be in format YYYY-MM-DD'),
];

const volunteerId = [
  query('volunteer_id').isInt({ min: 0 }).withMessage('Invalid volunteer_id'),
];

const validationSchema = {
<<<<<<< HEAD
  createVolunteerSchema: [
    body('name').trim().notEmpty(),
    body('date_joined')
      .isDate({ format: 'YYYY-MM-DD' })
      .withMessage('date_joined must be in format YYYY-MM-DD'),
  ],
  getVolunteerSchema: [param('name').trim().notEmpty()],
=======
  createVolunteerSchema: [...volunteerInfoSchema],
  getVolunteerSchema: [param('name').trim().notEmpty()],
  updateVolunteerSchema: [...volunteerInfoSchema, ...volunteerId],
>>>>>>> a4692745cc6c1fcb8afda55fa539e7fe80ed5916
};

module.exports = validationSchema;
