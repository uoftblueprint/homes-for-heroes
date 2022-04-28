const { body, query, param } = require('express-validator');

const validationSchema = {
    createPartnerSchema: [
        body('name').trim().notEmpty(),
    ],
    getDataSchema: [
    query('org_name').optional(),
    query('city').optional(),
    query('address').optional(),
    query('village').optional(),
    query('phone').optional(),
    query('email').optional(),
    query('page').isInt({ min: 0 }),
    query('page_size').isInt({ min: 0 }),
  ],
  updateInfoSchema: [
    body('*.org_name').optional(),
    body('*.city').optional(),
    body('*.address').optional(),
    body('*.village').optional(),
    body('*.phone').optional(),
    body('*.email').optional()
  ],
};

module.exports = validationSchema;