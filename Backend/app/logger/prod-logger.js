const { format, createLogger, transports } = require('winston');
const { timestamp, combine, errors, json } = format;

const getProdLogger = () =>
  createLogger({
    level: 'info', // Set minimum logging level to info
    format: combine(
      format.splat(), // String interpolation splat for %d %s-style messages.
      timestamp(),
      errors({ stack: false }), // Don't show stacktrace in error msg
      json(),
    ),
    transports: [new transports.Console()],
  });

module.exports = getProdLogger;
