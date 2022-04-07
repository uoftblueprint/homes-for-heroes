const { body, query, param } = require('express-validator');

const supporterInfoSchema = [
  body('name').trim().notEmpty(),
  body('date_gifted')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('date_gifted must be in format YYYY-MM-DD'),
  body('gift_provided').trim().notEmpty(),
];

const supporterId = [
  query('supporter_id').isInt({ min: 0 }).withMessage('Invalid partner_id'),
];

const validationSchema = {
  createSupporterSchema: [...supporterInfoSchema],
  getSupporterSchema: [param('name').trim().notEmpty()],
  updateSupporterSchema: [...supporterInfoSchema, ...supporterId],
};

module.exports = validationSchema;
