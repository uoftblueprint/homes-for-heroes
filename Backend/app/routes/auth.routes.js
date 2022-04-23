const authController = require('../controllers/auth.controller');
const validationSchema = require('../validators/auth.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');

module.exports = (app, passport) => {
  // app.post(
  //   '/signup',
  //   validationSchema.signUpSchema,
  //   validationErrorHandler,
  //   authController.signUp,
  // );

  app.post(
    '/login',
    validationSchema.loginSchema,
    validationErrorHandler,
    passport.authenticate('local', { failureRedirect: '/login' }),
    authController.login,
  );

  app.get('/logout', authController.logout);

  app.post(
    '/createVeteran',
    validationSchema.createVeteranSchema,
    validationErrorHandler,
    authController.createVeteran,
  );

  app.post(
    '/createAdmin',
    validationSchema.createAdminSchema,
    validationErrorHandler,
    authController.createAdmin,
  );
};
