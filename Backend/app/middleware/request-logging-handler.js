const logger = require('../logger');

// FIXME: Don't log sensitive stuff like request body in production
const requestLoggingHandler = (req, res, next) => {
  logger.info('%s %s %j', req.method, req.url, req.body);
  next();
};

module.exports = requestLoggingHandler;
