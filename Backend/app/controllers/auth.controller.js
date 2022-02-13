const Customer = require('../models/customer.model');
const logger = require('../logger');
const mailer = require('../mailer');
const nodemailer = require('nodemailer');
const {
  issueUserJWT,
  issueEmailJWT,
  verifyEmailJWT,
} = require('../auth/helpers');

const authController = {
  async signUp(req, res, next) {
    const { name, phone, email, password } = req.body;

    try {
      const user = await Customer.create(name, phone, email, password);
      const verificationCode = issueEmailJWT(user);
      // TODO: Grab correct hostname from env variables
      // TODO: Use frontend `verify` endpoint rather than the api directly
      const url = `http://${req.hostname}/api/verify/${verificationCode}`;
      res.json({ success: true });
      const mailTransporter = await mailer();
      const info = await mailTransporter.sendMail({
        from: '"Homes for Heroes" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: 'Your verification link for Homes for Heroes', // Subject line
        html: `Here is your verification link: <a href="${url}">${url}</a>`, // html body
      });
      logger.info('Email sent to %s with id: %s', email, info.messageId);
      // TODO: Remove in production
      logger.info('Email preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (err) {
      next(err);
    }
  },
  async login(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await Customer.getByEmail(email);

      logger.debug('%j', user);

      if (await user.isValidPassword(password)) {
        const token = issueUserJWT(user);
        res.json({ token });
      } else {
        next(new Error('Invalid password'));
      }
    } catch (err) {
      next(err);
    }
  },
  async verify(req, res, next) {
    const { verificationCode } = req.params;
    try {
      const { user_id } = verifyEmailJWT(verificationCode);
      const verified = await Customer.verify(user_id);
      res.json({ success: verified });
    } catch (err) {
      next(err);
    }
  },
  async logout(req, res, next) {
    try {
      // TODO: Clear the localstorage of the token
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  },
};

module.exports = authController;
