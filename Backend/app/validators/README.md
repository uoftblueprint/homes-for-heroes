# How to write your own validator

Each route should have its own validation scheme if any userinput is being accepted.
Once a route is created, create a new file in this folder with the name `ROUTENAME-validation.js`.

`express-validator` which is a wrapper on top of `validator.js` is used to validate input.

Each validation schema will follow this format:
### example-validation.js
```js
// Import the correct location for where the input should be coming from (param, body, query, https://express-validator.github.io/docs/check-api.html)
const { body, param } = require('express-validator');

// All of the validation schemas for a route are stored in their own `validationSchema` object
// Each route should have its own individual schema
// Schemas consist of an array of validation/sanitization chains
// Each chain begins with the location of the data and the name of the parameter (ex. body('email'))
const validationSchema = {
  route1Schema: [
    body('name').trim().notEmpty().escape(),
    body('email').isEmail().normalizeEmail(),
    body('phone').isMobilePhone(),
    body('password').isStrongPassword(),
  ],
  route2Schema: [body('email').notEmpty(), body('password').notEmpty()],
  route3Schema: [param('verificationCode').isJWT()],
};

module.exports = validationSchema;
```

Any validator and sanitizer found in the [validator.js](https://github.com/validatorjs/validator.js/) library may be used in the chain.
More `express.js` specific APIs can be found in the `express-validator` [API](https://express-validator.github.io/docs/check-api.html).

# Using the validator on your route

In order to use the validation schema on your route, import the validation schema and the validation error handler in to your route as follows.

### example-route.js
```js
const exampleController = require('../controllers/example.controller');
const validationSchema = require('../validators/example.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');

module.exports = (app) => {
  app.post(
    '/route1',
    validationSchema.route1Schema,
    validationErrorHandler,
    exampleController.route1,
  );

  app.post(
    '/route2',
    validationSchema.route2Schema,
    validationErrorHandler,
    exampleController.route2,
  );

  app.get(
    '/route3/:verificationCode',
    // Notice how the order matters and the validation is done before the route has access to the user input
    //---------------------
    validationSchema.route3Schema,
    validationErrorHandler,
    //---------------------
    exampleController.route3,
  );
};
```

## Warning
Make sure to place the schema and validation error handler in the same order and before any middleware that handle the user input needs validation.
