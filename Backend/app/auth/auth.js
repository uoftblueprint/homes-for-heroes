const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Customer = require('../models/customer.model');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(new JWTstrategy(
  { secretOrKey: 'CHANGE_ME', jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken },
  async (token, done) => {
    try {
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }
))

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const customer = await Customer.create(Math.random().toString(), Math.random().toString(), email, password);

        return done(null, customer);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const customer = await Customer.getByEmail(email);

        if (!customer) {
          return done(null, false, { message: 'User not found' });
        }

        const validate = await customer.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }

        delete customer['password']; // No longer required for processing

        return done(null, customer, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);