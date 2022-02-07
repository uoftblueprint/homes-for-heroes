const logger = require('../logger');

const requestLoggingHandler = (req, res, next) => {
  logger.info('%s %s %j', req.method, req.url, req.body);
  next();
};

module.exports = requestLoggingHandler;
