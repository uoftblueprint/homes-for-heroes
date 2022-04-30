const { body, param, query } = require('express-validator');

const validationSchema = {
  createSchema: [
    body('user_id').isInt({ min: 0 }).withMessage('Invalid user_id'),
    body('admin_id').isInt({ min: 0 }).withMessage('Invalid admin_id'),
    body('notes').trim().notEmpty().withMessage('Note may not be empty'),
  ],
  putSchema: [
    param('case_id').isInt({ min: 0 }).withMessage('Invalid case_id'),
    query('new_note').isString().isLength({ min: 1 }).withMessage('Invalid new note'),
    query('new_title').isString().isLength({ min: 1 }).withMessage('Invalid new title'),
  ],
  deleteSchema: [
    param('case_id').isInt({ min: 0 }).withMessage('Invalid case_id'),
  ],
};

module.exports = validationSchema;