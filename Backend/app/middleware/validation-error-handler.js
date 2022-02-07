const { validationResult } = require('express-validator');

const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // TODO: Replace w/ production level logging
    console.error(req.method, req.url, errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = validationErrorHandler;
