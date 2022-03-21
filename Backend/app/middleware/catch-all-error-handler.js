const logger = require('../logger');

// eslint-disable-next-line no-unused-vars
const catchAllErrorHandler = (error, req, res, next) => {
  res.status(500).json({ error: error.message ? error.message : error });
  logger.error('%s %s %s %s', res.statusCode, req.method, req.url, error);
};

module.exports = catchAllErrorHandler;
