const { format, createLogger, transports } = require('winston');
const { timestamp, combine, errors, json } = format;

const getProdLogger = () =>
  createLogger({
    level: 'info',
    format: combine(
      format.splat(),
      timestamp(),
      errors({ stack: true }),
      json(),
    ),
    transports: [new transports.Console()],
  });

module.exports = getProdLogger;
