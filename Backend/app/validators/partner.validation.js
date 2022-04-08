const { body, param } = require('express-validator');

const partnerInfoSchema = [body('name').trim().notEmpty()];

const partnerId = [
  query('partner_id').isInt({ min: 0 }).withMessage('Invalid partner_id'),
];

const validationSchema = {
<<<<<<< HEAD
  createPartnerSchema: [body('name').trim().notEmpty()],
  getPartnerSchema: [param('name').trim().notEmpty()],
=======
  createPartnerSchema: [...partnerInfoSchema],
  getPartnerSchema: [param('name').trim().notEmpty()],
  updatePartnerSchema: [...partnerInfoSchema, ...partnerId],
>>>>>>> a4692745cc6c1fcb8afda55fa539e7fe80ed5916
};

module.exports = validationSchema;
