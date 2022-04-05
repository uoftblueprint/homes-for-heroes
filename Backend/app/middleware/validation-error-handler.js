const { validationResult } = require('express-validator');
const logger = require('../logger');

const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logger.error('%s %s %j', req.method, req.url, errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = validationErrorHandler;
