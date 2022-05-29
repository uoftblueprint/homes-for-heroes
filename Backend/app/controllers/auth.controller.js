const Customer = require('../models/customer.model');
const Admin = require('../models/admin.model');
const logger = require('../logger');
const {
  issueEmailJWT,
  verifyEmailJWT,
  sendInviteLink,
  issueResetJWT,
  verifyResetJWT,
  sendResetLink
} = require('../auth/helpers');

const authController = {
  async signUp(req, res, next) {
    try {
      const {
        password,
        jwt,
      } = req.body;
      const { id } = verifyEmailJWT(jwt);
      const user = await Customer.getById(id);
      if(!user.verified) {
        await Customer.updateUserInfo(id, req.body);
        await user.changePassword(password);
        await Customer.verify(id);
        res.send({ success: true });
      } else
        next(new Error('User is already signed up'));
    } catch (err) {
      next(err);
    }
  },
  async checkJWT(req, res, next) {
    try {
      const { jwt } = req.params;
      const { id } = verifyEmailJWT(jwt);
      const user = await Customer.getById(id);
      if(!user.verified)
        res.send({ role_id: user.role_id });
      else
        next(new Error('User is already signed up'));
    } catch (err) {
      next(err);
    }
  },
  async login(req, res) {
    logger.info('User with id %s successfully logged in.', req.user.user_id);
    res.send({ user_id: req.user.user_id, role_id: req.user.role_id, expires: req.session.cookie.expires });
  },
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
  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      const user = await Customer.getByEmail(email);
      // Generate and send a reset link to the user's email
      const resetToken = issueResetJWT(user);
      await sendResetLink(email, resetToken);
      logger.info('Sent reset link to %s with user id %d', email, user.user_id);

      res.send({ success: true });
    } catch (err) {
      next(err);
    }
  },
  async resetPassword(req, res, next) {
    try {
      const { newPassword, token } = req.body;
      // Verify the token
      const { id } = verifyResetJWT(token);
      // Grab the user
      const user = await Customer.getById(id);
      // Change the user's password
      await user.changePassword(newPassword);

      res.send({ success: true });
    } catch (err) {
      next(err);
    }
  },
  async createVeteran(req, res, next) {
    const { name, email } = req.body;
    const { chapter_id } = req.user;
    try {
      const tempCustomer = await Customer.createTemp(name, email, chapter_id, 0);
      await Customer.createUserInfo(tempCustomer.user_id);
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
      const tempCustomer = await Admin.createTemp(name, email, chapter_id, 1); 
      const authToken = issueEmailJWT(tempCustomer);
      res.json({ success: true });
      await sendInviteLink(email, authToken);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = authController;
