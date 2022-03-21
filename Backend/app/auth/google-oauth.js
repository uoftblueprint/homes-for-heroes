require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20');
const OAuth = require('../models/oauth.model');
const Customer = require('../models/customer.model');

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
        try {
          const user_id = await OAuth.getUserId(profile.provider, profile.id);
          // If user doesn't exist, create a new client profile for them
          if (user_id === -1) {
            const user = await Customer.createOAuth(
              profile.displayName,
              profile.emails[0].value,
            );
            OAuth.create(user.user_id, profile.provider, profile.id);
            done(null, user);
          } else {
            const user = await Customer.getById(user_id);
            done(null, user);
          }
        } catch (err) {
          done(err, null);
        }
      },
    ),
  );
};
