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
<<<<<<< HEAD
  createSupporterSchema: [
    body('name').trim().notEmpty(),
    body('date_gifted')
      .isDate({ format: 'YYYY-MM-DD' })
      .withMessage('date_gifted must be in format YYYY-MM-DD'),
    body('gift_provided').trim().notEmpty(),
  ],
  getSupporterSchema: [param('name').trim().notEmpty()],
=======
  createSupporterSchema: [...supporterInfoSchema],
  getSupporterSchema: [param('name').trim().notEmpty()],
  updateSupporterSchema: [...supporterInfoSchema, ...supporterId],
>>>>>>> a4692745cc6c1fcb8afda55fa539e7fe80ed5916
};

module.exports = validationSchema;
