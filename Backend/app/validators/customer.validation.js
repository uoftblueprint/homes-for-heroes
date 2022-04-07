const { param, query, body } = require('express-validator');

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
  getToDoSchema: [...user_id],
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
  putUserInfoSchema: [
    body('gender').isString().isLength({ min: 1, max: 1 }).optional(),
    body('applicant_dob')
      .isDate({ format: 'YYYY-MM-DD' })
      .withMessage('start_date must be in format YYYY-MM-DD').optional(),
    body('street_name').isString().isLength({ max: 255 }).optional(),
    body('curr_level').isString().isLength({ max: 255 }).optional(), // Do we want to let the user set this??
    // TODO: Maybe force these two to be enums?
    body('city').isString().isLength({ max: 255 }).optional(),
    body('province').isString().isLength({ min: 2, max: 3 }).optional(),
    body('referral').isString().isLength({ max: 255 }).optional(),
  ],
  getUserInfoCSVSchema: [
    query('name').optional(),
    query('email').optional(),
    query('phone').optional(),
    query('address').optional(),
    query('kin_name').optional(),
  ],
  putToDoSchema: [
    query('user_id').isInt({ min: 0 }).withMessage('Invalid user_id'),
    query('todo').isArray().isLength({ min: 0 }).withMessage('Invalid To Do list passed'),
  ],
};

module.exports = validationSchema;
