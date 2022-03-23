const { Router } = require('express');
const apiRouter = Router();
const rateLimiter = require('../middleware/ratelimiter');
const passport = require('passport');

// Load authentication module
require('../auth/auth')(passport);
require('../auth/google-oauth')(passport);
require('../auth/facebook-oauth')(passport);

// Rate limit every api endpoint
apiRouter.use(rateLimiter);
require('./customer.routes')(apiRouter);
require('./casenote.routes')(apiRouter);
require('./auth.routes')(apiRouter);
require('./oauth.routes')(apiRouter, passport);
require('./custom-form.routes')(apiRouter);
require("./supporter.routes")(apiRouter);
require("./partner.routes")(apiRouter);
require("./volunteer.routes")(apiRouter);

module.exports = apiRouter;
