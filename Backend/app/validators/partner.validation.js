const { body, query, param } = require('express-validator');

const validationSchema = {
    createPartnerSchema = [
        body('name').trim().notEmpty(),
    ],
};

module.exports = validationSchema;