const logger = require('../logger');

// eslint-disable-next-line no-unused-vars
const catchAllErrorHandler = (error, req, res, next) => {
  const { message } = error;
  res.status(500).json({ error: message || error });
  logger.error('%s %s %s %s',
    res.statusCode,
    req.method,
    req.url,
    process.env.NODE_ENV === 'production' ? (message || error) : error
  );
};

module.exports = catchAllErrorHandler;
