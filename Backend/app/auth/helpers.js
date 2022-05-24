require('dotenv').config();
const jwt = require('jsonwebtoken');
const mailer = require('../mailer');
const logger = require('../logger');
const nodemailer = require('nodemailer');

const helpers = {
  issueEmailJWT(user) {
    const payload = {
      id: user.user_id,
    };

    return jwt.sign(payload, process.env.JWT_VERIFY_EMAIL_SECRET, { expiresIn: '1d' }); // Expires in 1 day
  },
  verifyEmailJWT(token) {
    return jwt.verify(token, process.env.JWT_VERIFY_EMAIL_SECRET);
  },
  issueResetJWT(user) {
    const payload = {
      id: user.user_id,
    };

    return jwt.sign(payload, process.env.JWT_RESET_EMAIL_SECRET, { expiresIn: '2h' }); // Expires in 2 hours
  },
  verifyResetJWT(token) {
    return jwt.verify(token, process.env.JWT_RESET_EMAIL_SECRET);
  },
  async sendInviteLink(email, token) {
    const mailTransporter = await mailer();
    const url = `http${process.env.SSL ? 's' : ''}://${process.env.HOST}/signup/${token}`;
    const info = await mailTransporter.sendMail({
      from: `"Homes for Heroes" <${process.env.SMPT_SENDER}>`, // sender address
      to: email, // list of receivers
      subject: 'Your invite link for Homes for Heroes', // Subject line
      html: `Here is your invite link: <a href="${url}">${url}</a>`, // html body
    });
    logger.info('Email sent to %s with id: %s', email, info.messageId);
    if (process.env.NODE_ENV !== 'production') logger.info('Email preview URL: %s', nodemailer.getTestMessageUrl(info));
  },
  async sendResetLink(email, token) {
    const mailTransporter = await mailer();
    const url = `http${process.env.SSL ? 's' : ''}://${process.env.HOST}/reset/${token}`;
    const info = await mailTransporter.sendMail({
      from: `"Homes for Heroes" <${process.env.SMPT_SENDER}>`, // sender address
      to: email, // list of receivers
      subject: 'Your password reset link for Homes for Heroes', // Subject line
      html: `Here is your password reset link: <a href="${url}">${url}</a><br>If you did not request a reset, please ignore this email.`, // html body
    });
    logger.info('Email sent to %s with id: %s', email, info.messageId);
    if (process.env.NODE_ENV !== 'production') logger.info('Email preview URL: %s', nodemailer.getTestMessageUrl(info));
  },
  async isAuthenticated(req, res, next) {
    if(req.user)
      next();
    else
      next(new Error('User not authenticated'));
  },
  async isSuperAdmin(req, res, next) {
    if(req.user && req.user.role_id === 2)
      next();
    else
      next(new Error('Insufficient Permissions'));
  },
  async isSupervisor(req, res, next) {
    if(req.user && req.user.role_id === 1)
      next();
    else
      next(new Error('Insufficient Permissions'));
  },
  async isPrivileged(req, res, next) {
    if(req.user && req.user.role_id >= 1)
      next();
    else
      next(new Error('Insufficient Permissions'));
  },
};

module.exports = helpers;
