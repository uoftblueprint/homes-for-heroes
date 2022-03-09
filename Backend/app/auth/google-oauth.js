require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20');

const options = {
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: '/api/redirect/google',
  scope: ['email', 'profile'],
};

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
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
