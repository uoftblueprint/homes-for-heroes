const rateLimit = require('express-rate-limit');
const logger = require('../logger');

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Log the rate-limits
  handler: (req, res, next, options) => {
    logger.info('%s %s %s User rate limited', options.statusCode, req.method, req.url);
    res.status(options.statusCode).send(options.message);
  }
});