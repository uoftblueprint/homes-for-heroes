const { body, param } = require('express-validator');

// Common
const admin_id = [
  param('admin_id').isInt({ min: 0 }).withMessage('Invalid admin_id'),
];

const chapter_id = [
  param('chapter_id').isInt({ min: 0 }).withMessage('Invalid chapter_id'),
];

const validationSchema = {
  makeSuperadminSchema: [...admin_id],
  unsetSuperadminSchema: [...admin_id],
  deleteSupervisorSchema: [...admin_id],
  assignChapterSchema: [
    ...admin_id,
    body('chapter_id').trim().notEmpty(),
  ],
  listChapterSupervisorsSchema: [...chapter_id],
  createAdminSchema: [
    body('name').trim().notEmpty().escape(),
    body('email').isEmail().normalizeEmail(),
    body('phone').isMobilePhone(),
    body('password').isStrongPassword(),
    body('address').trim().notEmpty(),
    body('chapter_id').isInt({ min: 0 })
  ],
  listChapterSupervisorsSchema: [...chapter_id],
};

module.exports = validationSchema;