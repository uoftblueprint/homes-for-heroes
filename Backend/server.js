const express = require('express');
const cors = require('cors');
const passport = require('passport');
const logger = require('./app/logger');
const catchAllErrorHandler = require('./app/middleware/catch-all-error-handler');
const requestLoggingHandler = require('./app/middleware/request-logging-handler');

const app = express();

// TODO: set a fixed origin
const corsOptions = {
  origin: '*', // temporarily allow any host for testing
};

app.use(cors(corsOptions));

// Load authentication module
require('./app/auth/auth')(passport);
app.use(passport.initialize());

// parse requests of content-type - application/json
app.use(express.json());

// Log every request
app.use(requestLoggingHandler);

require('./app/routes/customer.routes')(app);
require('./app/routes/casenote.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/custom-form.routes')(app);

// Catch any errors that haven't been caught by the appropriate handler
app.use(catchAllErrorHandler);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
});
