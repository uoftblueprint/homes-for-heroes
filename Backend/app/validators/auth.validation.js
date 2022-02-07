const { body } = require('express-validator');

const validationSchema = {
  signUpSchema: [
    body('name').trim().notEmpty().escape(),
    body('email').isEmail().normalizeEmail(),
    body('phone').isMobilePhone(),
    body('password').isStrongPassword(),
  ],
  loginSchema: [body('email').notEmpty(), body('password').notEmpty()],
};

module.exports = validationSchema;
