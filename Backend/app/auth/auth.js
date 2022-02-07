const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Customer = require('../models/customer.model');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'CHANGEME', // TODO: Switch to pub/priv keypair
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwt, done) => {
      try {
        const user = await Customer.getById(jwt.id);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }),
  );
};
