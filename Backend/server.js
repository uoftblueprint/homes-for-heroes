require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('./app/logger');
const catchAllErrorHandler = require('./app/middleware/catch-all-error-handler');
const requestLoggingHandler = require('./app/middleware/request-logging-handler');
const apiRouter = require('./app/routes');
const db = require('./app/models/db');
const redisClient = require('./app/redis');
const session = require('express-session');
const redisStore = require('connect-redis')(session);

const app = express();

// TODO: set a fixed origin
const corsOptions = {
  origin: '*', // temporarily allow any host for testing
};

app.use(cors(corsOptions));

// Decodes cookies for other middleware
app.use(cookieParser(process.env.SESSION_SECRET));

// Use Redis for session storage
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new redisStore({
      host: 'localhost',
      port: 6379,
      client: redisClient,
      ttl: 260,
    }),
    saveUninitialized: false,
    resave: false,
    cookie: { secure: /* process.env.NODE_ENV !== 'development' */false, maxAge: 86400 },
    name: 'sid'
  }),
);

// parse requests of content-type - application/json
app.use(express.json());

// Log every request
app.use(requestLoggingHandler);

// Set the api endpoint
app.use('/api', apiRouter);

require("./app/routes/customer.routes")(app);
require("./app/routes/casenote.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/custom-form.routes")(app);
require("./app/routes/admin.routes")(app);
require("./app/routes/chapter.routes")(app);
require("./app/routes/supervisor.routes")(app);
require("./app/routes/superadmin.routes")(app);
require("./supporter.routes")(app);
require("./partner.routes")(app);
require("./volunteer.routes")(app);
// Serve the React files if in prod mode
if (process.env.NODE_ENV === 'production') app.use(express.static('public'));

// Catch any errors that haven't been caught by the appropriate handler
app.use(catchAllErrorHandler);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(
    `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode.`,
  );
});

process.on('SIGINT', async () => {
  // Close the database connection gracefully on signal interrupt
  db.end((err) => {
    if (err) logger.error(err);
    else logger.info('Exiting gracefully.');
    process.exit(err ? 1 : 0);
  });
  await redisClient.quit();
});
