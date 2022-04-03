const { body, param } = require('express-validator');


const formBodyValidator = [
  body('form_body.questions').isArray().isLength({ min: 1 }).withMessage('Form must contain at least one question'),
  body('form_body.questions.*.type').isInt({ min: 1, max: 10 }).withMessage('Invalid question type'),
  body('form_body.questions.*.question').trim().isString().notEmpty().withMessage('Question cannot be empty'),
  body('form_body.questions.*.options')
    .if((value, { req, path }) => {
      const wildcardIndex = parseInt(path.match(/([0-9]+)/)[1]);
      return [3, 4, 5, 7, 8].includes(req.body.form_body.questions[wildcardIndex].type);
    })
    .exists().withMessage('This question type requires options')
    .isArray()
    .isLength({ min: 1 }).withMessage('At least one option is needed')
    .custom((value) => {
      if (new Set(value).size !== value.length) {
        throw 'Each option must be unique';
      }
      return true;
    }),
  body('form_body.questions.*.options.*').trim().isString().notEmpty().withMessage('Option cannot be empty'),
  body('form_body.questions.*.rows')
    .if((value, { req, path }) => {
      const wildcardIndex = parseInt(path.match(/([0-9]+)/)[1]);
      return [7, 8].includes(req.body.form_body.questions[wildcardIndex].type);
    })
    .exists().withMessage('This question type requires rows')
    .isArray()
    .isLength({ min: 1 }).withMessage('At least one option is needed')
    .custom((value) => {
      if (new Set(value).size !== value.length) {
        throw 'Each option must be unique';
      }
      return true;
    }),
  body('form_body.questions.*.rows.*').trim().isString().notEmpty().withMessage('Row option cannot be empty'),
  body('form_body.questions.*.required').isBoolean().withMessage('Is question required')
];


const validationSchema = {
  getCustomFormSchema: [
    param('form_id').isInt({ min: 0 }).withMessage('Invalid form_id'),
  ],
  createCustomFormSchema: [
    body('admin_id').isInt({ min: 0 }).withMessage('Invalid admin_id'),
    body('title').trim().notEmpty().withMessage('Title cannot be empty'),
    body('curr_level').isArray().isLength({ min: 1, max: 4 }).withMessage('Choose visibility level'),
    body('form_body').isObject().notEmpty().withMessage('Form cannot be empty'),
    ...formBodyValidator
  ],
  updateCustomFormSchema: [
    param('form_id').isInt({ min: 0 }).withMessage('Invalid form_id'),
    body('admin_id').isInt({ min: 0 }).withMessage('Invalid admin_id'),
    body('title').trim().notEmpty().withMessage('Title cannot be empty'),
    body('curr_level').isArray().isLength({ min: 1, max: 4 }).withMessage('Choose visibility level'),
    body('form_body').isObject().notEmpty(),
    ...formBodyValidator
  ],
  publishFormSchema: [
    body('form_id').isInt({ min: 0 }).withMessage('Invalid form_id'),
  ],
};

module.exports = validationSchema;
