const authController = require('../controllers/auth.controller');
const validationSchema = require('../validators/auth.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');

module.exports = (app, passport) => {
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
    passport.authenticate('local', { failureRedirect: '/login' }),
    authController.login,
  );

  app.get(
    '/verify/:verificationCode',
    validationSchema.verifySchema,
    validationErrorHandler,
    authController.verify,
  );

  app.get('/logout', authController.logout);
};
