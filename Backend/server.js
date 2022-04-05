const express = require("express");
const cors = require("cors");

require('./app/auth/auth');

const app = express();

// TODO: set a fixed origin
const corsOptions = {
    origin: "*" // temporarily allow any host for testing
}

app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome!" });
});

require("./app/routes/customer.routes")(app);
require("./app/routes/casenote.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/custom-form.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
