const { Router } = require('express');
const apiRouter = Router();
const rateLimiter = require('../middleware/ratelimiter');
const passport = require('passport');

// Load authentication module
apiRouter.use(passport.initialize({}));
apiRouter.use(passport.session({}));
require('../auth/auth')(passport);
require('../auth/google-oauth')(passport);

// Rate limit every api endpoint
apiRouter.use(rateLimiter);
require('./customer.routes')(apiRouter);
require('./casenote.routes')(apiRouter);
require('./auth.routes')(apiRouter, passport);
require('./oauth.routes')(apiRouter, passport);
require('./custom-form.routes')(apiRouter);
require("./supporter.routes")(apiRouter);
require("./partner.routes")(apiRouter);
require("./volunteer.routes")(apiRouter);
require('./admin.routes')(apiRouter);
require('./chapter.routes')(apiRouter);

module.exports = apiRouter;
