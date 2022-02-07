const { body } = require('express-validator');

const validationSchema = {
  createSchema: [
    body('user_id').isInt({ min: 0 }).withMessage('Invalid user_id'),
    body('admin_id').isInt({ min: 0 }).withMessage('Invalid admin_id'),
    body('notes').trim().notEmpty().withMessage('Note may not be empty'),
  ],
};

module.exports = validationSchema;
