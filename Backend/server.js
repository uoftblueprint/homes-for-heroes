const express = require('express');
const cors = require('cors');
const passport = require('passport');
const logger = require('./app/logger');
const catchAllErrorHandler = require('./app/middleware/catch-all-error-handler');
const requestLoggingHandler = require('./app/middleware/request-logging-handler');
const apiRouter = require('./app/routes');
const db = require('./app/models/db');

const app = express();

// TODO: set a fixed origin
const corsOptions = {
  origin: '*', // temporarily allow any host for testing
};

app.use(cors(corsOptions));

// Load authentication module
require('./app/auth/auth')(passport);
app.use(passport.initialize({}));

// parse requests of content-type - application/json
app.use(express.json());

// Log every request
app.use(requestLoggingHandler);

// Set the api endpoint
app.use('/api', apiRouter);

// Serve the React files if in prod mode
if(process.env.NODE_ENV === 'production')
  app.use(express.static('public'));

// Catch any errors that haven't been caught by the appropriate handler
app.use(catchAllErrorHandler);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode.`);
});

process.on('SIGINT', () => {
  // Close the database connection gracefully on signal interrupt
  db.end((err) => {
    if (err) logger.error(err);
    logger.info('Exiting gracefully.');
    process.exit(err ? 1 : 0);
  });
});
