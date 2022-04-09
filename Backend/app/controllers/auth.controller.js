const Customer = require('../models/customer.model');
const Admin = require('../models/admin.model');
const logger = require('../logger');
const {
  issueEmailJWT,
  verifyEmailJWT,
  sendInviteLink
} = require('../auth/helpers');

const authController = {
  // async signUp(req, res, next) {
  //   const { name, phone, email, password } = req.body;
  //
  //   try {
  //     const user = await Customer.create(name, phone, email, password);
  //     const verificationCode = issueEmailJWT(user);
  //     // TODO: Grab correct hostname from env variables
  //     // TODO: Use frontend `verify` endpoint rather than the api directly
  //     const url = `http://${req.hostname}/api/verify/${verificationCode}`;
  //     res.json({ success: true });
  //     const mailTransporter = await mailer();
  //     const info = await mailTransporter.sendMail({
  //       from: '"Homes for Heroes" <foo@example.com>', // sender address
  //       to: email, // list of receivers
  //       subject: 'Your verification link for Homes for Heroes', // Subject line
  //       html: `Here is your verification link: <a href="${url}">${url}</a>`, // html body
  //     });
  //     logger.info('Email sent to %s with id: %s', email, info.messageId);
  //     // TODO: Remove in production
  //     logger.info('Email preview URL: %s', nodemailer.getTestMessageUrl(info));
  //   } catch (err) {
  //     next(err);
  //   }
  // },
  async login(req, res) {
    logger.info('User with id %s successfully logged in.', req.user.user_id);
    res.send({ role_id: req.user.role_id });
  },
  // async verify(req, res, next) {
  //   const { verificationCode } = req.params;
  //   try {
  //     const { id } = verifyEmailJWT(verificationCode);
  //     const verified = await Customer.verify(id);
  //     res.json({ success: verified });
  //   } catch (err) {
  //     next(err);
  //   }
  // },
  async logout(req, res, next) {
    try {
      // Logout through passport api
      await req.logout();
      // Destroy the session on the redis store
      req.session.destroy((err) => {
        if (err) logger.error('%o', err);
        else res.redirect('/');
      });
    } catch (err) {
      next(err);
    }
  },
  async createVeteran(req, res, next) {
    const { name, email } = req.body;
    try {
      const tempCustomer = await Customer.createTemp(name, email, 0);
      const authToken = issueEmailJWT(tempCustomer);
      res.json({ success: true });
      await sendInviteLink(email, authToken);
    } catch (err) {
      next(err);
    }
  },
  async createAdmin(req, res, next) {
    const { name, email, chapter_id } = req.body;
    try {
      const tempCustomer = await Admin.createTemp(name, email, chapter_id);
      const authToken = issueEmailJWT(tempCustomer);
      res.json({ success: true });
      await sendInviteLink(email, authToken);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = authController;
