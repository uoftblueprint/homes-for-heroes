const { Router } = require('express');
const apiRouter = Router();

require('./customer.routes')(apiRouter);
require('./casenote.routes')(apiRouter);
require('./auth.routes')(apiRouter);
require('./custom-form.routes')(apiRouter);


module.exports = apiRouter;