require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('./app/logger');
const catchAllErrorHandler = require('./app/middleware/catch-all-error-handler');
const requestLoggingHandler = require('./app/middleware/request-logging-handler');
const apiRouter = require('./app/routes');
const db = require('./app/models/db');
const redisClient = require('./app/redis');
const session = require('express-session');
const path = require('path');
const redisStore = require('connect-redis')(session);
const app = express();

// Decodes cookies for other middleware
app.use(cookieParser(process.env.SESSION_SECRET));

// Use Redis for session storage
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new redisStore({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      client: redisClient,
      ttl: 24 * 60 * 60, // hours * minutes * seconds
    }),
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: Boolean(process.env.SSL) || false,
      maxAge: 24 * 60 * 60 * 1000, // hours * minutes * seconds * ms
      httpOnly: true,
    },
    name: 'sid'
  }),
);

// parse requests of content-type - application/json
app.use(express.json());

// Log every request
app.use(requestLoggingHandler);

// Set the api endpoint
app.use('/api', apiRouter);

// Serve the React files if in prod mode
if (process.env.NODE_ENV === 'production') app.use(express.static(path.join(__dirname, 'public')));

// Catch any errors that haven't been caught by the appropriate handler
app.use(catchAllErrorHandler);
require('./app/routes/customer.routes')(app);
require('./app/routes/casenote.routes')(app);
require('./app/routes/custom-form.routes')(app);
require('./app/routes/questionnaire.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(
    `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode.`,
  );
});

process
  .on('SIGINT', async () => {
    // Close the database connection gracefully on signal interrupt
    db.end((err) => {
      if (err) logger.error(err);
      else logger.info('Exiting gracefully.');
      process.exit(err ? 1 : 0);
    });
    await redisClient.quit();
  })
  .on('unhandledRejection', (reason, p) => {
    logger.error('%s : Unhandled Rejection at Promise %o', reason, p);
  });