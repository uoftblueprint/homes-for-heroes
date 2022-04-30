const { body } = require('express-validator');

const validationSchema = {
  createPartnerSchema: [
    body('name').trim().notEmpty(),
  ],
};

module.exports = validationSchema;