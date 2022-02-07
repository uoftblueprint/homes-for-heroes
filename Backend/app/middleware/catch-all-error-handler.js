const logger = require('../logger');

const catchAllErrorHandler = (error, req, res) => {
  res.status(500).send(error);
  logger.error(`${res.status} ${req.method} ${req.url} ${error}`);
};

module.exports = catchAllErrorHandler;
