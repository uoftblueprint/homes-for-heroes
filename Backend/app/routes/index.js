const { Router } = require('express');
const apiRouter = Router();
const rateLimiter = require('../middleware/ratelimiter');

// Rate limit every api endpoint
apiRouter.use(rateLimiter);
require('./customer.routes')(apiRouter);
require('./casenote.routes')(apiRouter);
require('./auth.routes')(apiRouter);
require('./custom-form.routes')(apiRouter);


module.exports = apiRouter;