const LocalStrategy = require('passport-local').Strategy;
const Customer = require('../models/customer.model');
const logger = require('../logger');


module.exports = (passport) => {
  passport.use(new LocalStrategy({ usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await Customer.getByEmail(email);
        if(await user.isValidPassword(password)) {
          if(!user.verified)
            done(new Error('User is not verified yet!'), false);
          else
            done(null, user);
        } else
          done(new Error('Invalid Credentials.'), false);
      } catch (err) {
        done(err);
      }
    }));

  passport.serializeUser(async (user, done) => {
    logger.info('Serializing user_id: %s', user.user_id);
    done(null, user.user_id);
  });

  passport.deserializeUser(async (user_id, done) => {
    try {
      logger.info('Deserializing user_id: %s', user_id);
      const user = await Customer.getById(user_id);
      done(null, user);
    } catch (err) {
      logger.error(err);
      done(err, null);
    }
  });
};
