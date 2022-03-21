require('dotenv').config();
const FacebookStrategy = require('passport-facebook');

const options = {
  clientID: process.env['FACEBOOK_CLIENT_ID'],
  clientSecret: process.env['FACEBOOK_CLIENT_SECRET'],
  callbackURL: '/api/redirect/facebook',
  profileFields: ['id', 'displayName', 'email', 'picture'],
  scope: ['email'],
};

module.exports = (passport) => {
  passport.use(
    new FacebookStrategy(
      options,
      async (accessToken, refreshToken, profile, done) => {
        done(null, profile);
      },
    ),
  );

  passport.serializeUser(async (user, done) => {
    done(null, user.id);
  });

  // passport.deserializeUser(async (user_id, done) => {
  //   logger.info('Deserializing user_id: %s', user_id);
  //   const user = await Customer.getById(user_id);
  //   done(null, user);
  // });
};
