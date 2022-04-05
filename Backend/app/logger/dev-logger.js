const { format, createLogger, transports } = require('winston');
const { timestamp, combine, printf, errors } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const getDevLogger = () =>
  createLogger({
    level: 'debug',
    format: combine(
      format.splat(), // String interpolation splat for %d %s-style messages.
      format.colorize(), // Add color to format
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      logFormat,
    ),
    transports: [new transports.Console()],
  });

module.exports = getDevLogger;
