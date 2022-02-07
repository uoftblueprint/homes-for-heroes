const express = require('express');
const cors = require('cors');
const catchAllErrorHandler = require('./app/middleware/catch-all-error-handler');
// Load authentication module
require('./app/auth/auth');

const app = express();

// TODO: set a fixed origin
const corsOptions = {
  origin: '*', // temporarily allow any host for testing
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

require('./app/routes/customer.routes')(app);
require('./app/routes/casenote.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/custom-form.routes')(app);

// Catch any errors that haven't been caught by the appropriate handler
app.use(catchAllErrorHandler);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
