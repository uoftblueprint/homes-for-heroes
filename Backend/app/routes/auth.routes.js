const authController = require('../controllers/auth.controller');
const validationSchema = require('../validators/auth.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');
const { isAuthenticated, isPrivileged, isSuperAdmin } = require('../auth/helpers');

module.exports = (app, passport) => {

  app.post(
    '/signup',
    validationSchema.signUpSchema,
    validationErrorHandler,
    authController.signUp,
  );

  app.get(
    '/checkJWT/:jwt',
    validationSchema.checkJWT,
    validationErrorHandler,
    authController.checkJWT,
  );

  app.post(
    '/login',
    validationSchema.loginSchema,
    validationErrorHandler,
    passport.authenticate('local', { failureRedirect: '/login' }),
    authController.login,
  );

  app.get('/logout', isAuthenticated, authController.logout);

  app.post(
    '/createVeteran',
    // isPrivileged,
    validationSchema.createVeteranSchema,
    validationErrorHandler,
    authController.createVeteran,
  );

  app.post(
    '/createAdmin',
    // isSuperAdmin,
    validationSchema.createAdminSchema,
    validationErrorHandler,
    authController.createAdmin,
  );
};
