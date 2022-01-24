const passport = require('passport');

module.exports = app => {
  const authController = require('../controllers/auth.controller');

  app.post('/signup', passport.authenticate('signup', {session: false}), authController.signUp);
  app.post('/login', authController.login);
}