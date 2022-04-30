const Customer = require('../models/customer.model');
const Admin = require('../models/admin.model');
const logger = require('../logger');
const {
  issueEmailJWT,
  verifyEmailJWT,
  sendInviteLink,
} = require('../auth/helpers');

const authController = {
  async signUp(req, res, next) {
    try {
      const {
        name,
        gender,
        email,
        password,
        phone,
        applicant_dob,
        street_name,
        curr_level,
        city,
        province,
        referral,
        jwt,
      } = req.body;
      const { id } = verifyEmailJWT(jwt);
      const user = await Customer.getById(id);
      if(!user.verified) {
        await user.update(name, phone, email);
        await user.updateUserInfo({
          gender,
          applicant_dob,
          street_name,
          curr_level,
          city,
          province,
          referral,
        });
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
    res.send({ role_id: req.user.role_id, expires: req.session.cookie.expires });
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
