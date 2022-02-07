const { body, query, param } = require('express-validator');

const validationSchema = {
  getCustomFormSchema: [
    param('form_id')
      .isInt({min: 0})
      .withMessage('Invalid form_id')
  ],
  createCustomFormSchema: [
    body('admin_id')
      .isInt({min: 0})
      .withMessage('Invalid admin_id'),
    body('title').trim().notEmpty(),
    body('form_body').isObject().notEmpty()
  ],
  queryCustomForms: [
    query('admin_id')
      .isInt({min: 0})
      .withMessage('Invalid admin_id'),
    query('form_id')
      .isInt({min: 0})
      .withMessage('Invalid form_id'),
  ]
}

module.exports = validationSchema;