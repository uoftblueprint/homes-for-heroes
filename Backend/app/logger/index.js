const getDevLogger = require('./dev-logger');
const getProdLogger = require('./prod-logger');

module.exports =
  process.env.NODE_ENV === 'production' ? getProdLogger() : getDevLogger();
