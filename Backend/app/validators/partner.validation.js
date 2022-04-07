const { body, query, param } = require('express-validator');

const partnerInfoSchema = [
    body('name').trim().notEmpty(),
],

const partnerId = [
    query('partner_id').isInt({ min: 0 }).withMessage('Invalid partner_id'),
],

const validationSchema = {
    createPartnerSchema: [...partnerInfoSchema],
    getPartnerSchema: [
        param('name').trim().notEmpty(),
    ],
    updatePartnerSchema: [...partnerInfoSchema, ...partnerId],
};

module.exports = validationSchema;