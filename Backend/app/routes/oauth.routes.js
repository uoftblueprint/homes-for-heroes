const oauth = require('../controllers/oauth.controller');

module.exports = (app, passport) => {
  app.get('/oauth2/google', passport.authenticate('google'));
  app.get('/redirect/google', passport.authenticate('google'), oauth.googleRedirect);

  app.get('/oauth2/facebook', passport.authenticate('facebook'));
  app.get('/redirect/facebook', passport.authenticate('facebook'), oauth.facebookRedirect);
};
