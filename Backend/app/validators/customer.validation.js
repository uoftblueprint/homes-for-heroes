const { param, query } = require('express-validator');

// Reused schemas
const user_id = [
  param('user_id').isInt({ min: 0 }).withMessage('Invalid user_id'),
];

const case_id = [
  query('case_id').isInt({ min: 0 }).withMessage('Invalid case_id'),
];

const validationSchema = {
  getCustomerInfoSchema: [...user_id],
  getAlertCaseSchema: [...user_id],
  setAlertCaseSchema: [...user_id, ...case_id],
  getCasesSchema: [
    query('user_id').isInt({ min: 0 }).withMessage('Invalid user_id'),
    query('start_date')
      .isDate({ format: 'YYYY-MM-DD' })
      .withMessage('start_date must be in format YYYY-MM-DD'),
    query('end_date')
      .isDate({ format: 'YYYY-MM-DD' })
      .withMessage('start_date must be in format YYYY-MM-DD'),
  ],
  getUserDataSchema: [
    query('name').optional(),
    query('email').optional(),
    query('phone').optional(),
    query('street_name').optional(),
    query('kin_name').optional(),
    query('page').isInt({ min: 0 }),
    query('page_size').isInt({ min: 0 }),
  ],
  getUserInfoCSVSchema: [
    query('name').optional(),
    query('email').optional(),
    query('phone').optional(),
    query('address').optional(),
    query('kin_name').optional(),
  ],
  updateCustomerProfileSchema: [
    query('name'),
    query('email').isEmail(),
    query('phone').isMobilePhone(),
    query('street_name'),
    query('city'),
    query('province'),
    query('applicant_dob').isDate()
  ],
};

module.exports = validationSchema;
