const { body, query } = require('express-validator');

const validationSchema = {
  createVolunteerSchema: [
    body('name').trim().notEmpty(),
    body('date_joined').isDate({ format: 'YYYY-MM-DD' }).withMessage('date_joined must be in format YYYY-MM-DD'),
  ],
  getDataSchema: [
    query('name').optional(),
    query('village').optional(),
    query('date_joined').optional(),
    query('role').optional(),
    query('phone').optional(),
    query('email').optional(),
    query('page').isInt({ min: 0 }),
    query('page_size').isInt({ min: 0 }),
  ],
  getCSVSchema: [
    query('name').optional(),
    query('village').optional(),
    query('date_joined').optional(),
    query('role').optional(),
    query('phone').optional(),
    query('email').optional(),
  ],
  updateInfoSchema: [
    body('*.name').optional(),
    body('*.village').optional(),
    body('*.date_joined').optional(),
    body('*.role').optional(),
    body('*.phone').optional(),
    body('*.email').optional(),
  ],
  deleteSchema: [
    body('rows.*').isInt()
  ]
};

module.exports = validationSchema;