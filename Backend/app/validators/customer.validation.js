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
  getAlertCaseIDSchema: [...user_id],
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
    query('email').optional(),
    query('applicant_phone').optional(),
    query('curr_level').optional(),
    query('income').optional(),
    query('referral').optional(),
    query('outgoing').optional(),
    query('demographic').optional(),
    query('name').optional(),
    query('chapter_name').optional()
  ],
  getCSVSchema: [
    query('email').isEmail().optional(),
    query('applicant_phone').isMobilePhone().optional(),
    query('curr_level').isString().isLength({ max: 255 }).optional(),
    query('income').isInt().optional(),
    query('referral').isString().isLength({ max: 255 }).optional(),
    query('outgoing').isString().isLength({ max: 255 }).optional(),
    query('demographic').isString().isLength({max: 255}).optional(),
    query('name').isString().optional()
  ],
  updateUserInfoSchema: [
    //body('gender').isString().isLength({ min: 1, max: 1 }).optional(),
    // body('applicant_dob')
    //   .isDate({ format: 'YYYY-MM-DD' })
    //   .withMessage('start_date must be in format YYYY-MM-DD').optional(),
    //body('street_name').isString().isLength({ max: 255 }).optional(),
    //body('curr_level').isString().isLength({ max: 255 }).optional(), // Do we want to let the user set this??
    // TODO: Maybe force these two to be enums?
    body('*.email').isEmail().optional(),
    body('*.applicant_phone').isMobilePhone().optional(),
    body('*.curr_level').isString().isLength({ max: 255 }).optional(),
    body('*.income').isInt().optional(),
    body('*.referral').isString().isLength({ max: 255 }).optional(),
    body('*.outgoing').isString().isLength({ max: 255 }).optional(),
    body('*.demographic').isString().isLength({max: 255}).optional(),
    body('*.name').isString().optional()

  ], 
  putToDoSchema: [
    param('user_id').isInt({ min: 0 }).withMessage('Invalid user_id'),
    query('todo').isJSON().isLength({ min: 0 }).withMessage('Invalid To Do list passed'),
  ],
  patchChangePasswordSchema: [
    body('oldPassword').isString(),
    body('newPassword').isStrongPassword(),
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
  deleteVeteranSchema: [
    body('rows.*').isInt()
  ]
};

module.exports = validationSchema;
