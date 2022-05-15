const { body, param } = require('express-validator');

const validationSchema = {
  signUpSchema: [
    body('name').trim().notEmpty().escape(),
    body('gender').isString().isLength({ min: 1, max: 1 }),
    body('email').isEmail().normalizeEmail(),
    body('password').isStrongPassword(),
    body('phone').isMobilePhone(),
    body('applicant_dob')
      .isDate({ format: 'YYYY-MM-DD' })
      .withMessage('start_date must be in format YYYY-MM-DD'),
    body('street_name').isString().isLength({ max: 255 }),
    body('curr_level').isInt(), // Do we want to let the user set this??
    // TODO: Maybe force these two to be enums?
    body('city').isString().isLength({ max: 255 }),
    body('province').isString().isLength({ min: 2, max: 3 }),
    body('referral').isString().isLength({ max: 255 }),
    body('income').isString().isLength({ max: 255 }).optional(),
    body('demographic').isString().isLength({ max: 255 }).optional(),
    body('jwt').isJWT(),
  ],
  checkJWT: [
    param('jwt').isJWT(),
  ],
  createVeteranSchema: [
    body('name').trim().notEmpty().escape(),
    body('email').isEmail().normalizeEmail(),
    body('gender').optional(),
    body('phone').isMobilePhone(),
  ],
  createAdminSchema: [
    body('name').trim().notEmpty().escape(),
    body('email').isEmail().normalizeEmail(),
    body('chapter_id').isInt({ min: 0 }),
  ],
  createAdminSchema: [
    body('name').trim().notEmpty().escape(),
    body('email').isEmail().normalizeEmail(),
    body('chapter_id').isInt({ min: 0 }),
  ],
  loginSchema: [body('email').isEmail().normalizeEmail().notEmpty(), body('password').notEmpty()],
  forgotPasswordSchema: [body('email').isEmail().normalizeEmail().notEmpty()],
  resetPasswordSchema: [body('newPassword').isStrongPassword(), body('token').isJWT()]
};

module.exports = validationSchema;
