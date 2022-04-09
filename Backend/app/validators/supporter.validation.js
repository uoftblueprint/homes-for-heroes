const { body, query, param } = require('express-validator');

const validationSchema = {
    createSupporterSchema: [
        body('name').trim().notEmpty(),
        body('date_gifted').isDate({ format: 'YYYY-MM-DD' }).withMessage('date_gifted must be in format YYYY-MM-DD'),
        body('gift_provided').trim().notEmpty(),
    ],
    getDataSchema: [
    query('name').optional(),
    query('phone').optional(),
    query('gift_provided').optional(),
    query('phone').optional(),
    query('page').isInt({ min: 0 }),
    query('page_size').isInt({ min: 0 }),
  ],
  updateInfoSchema: [
    body('*.name').optional(),
    body('*.phone').optional(),
    body('*.gift_provided').optional(),
    body('*.phone').optional(),
  ],
};

module.exports = validationSchema;