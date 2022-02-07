const authController = require('../controllers/auth.controller');
const validationSchema = require('../validators/auth.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');

module.exports = (app) => {
  app.post(
    '/signup',
    validationSchema.signUpSchema,
    validationErrorHandler,
    authController.signUp,
  );

  app.post(
    '/login',
    validationSchema.loginSchema,
    validationErrorHandler,
    authController.login,
  );
};
