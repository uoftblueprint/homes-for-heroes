const jwt = require('jsonwebtoken');
const Customer = require('../models/customer.model');
const logger = require('../logger');

const issueJWT = (user) => {
  const payload = {
    id: user.user_id,
    role: 1, // TODO: Change role based on type of user (client: 1, admin: 2, superadmin: 3)
    iat: Date.now(),
  };

  return jwt.sign(payload, 'CHANGEME', { expiresIn: '1d' });
};

const authController = {
  async signUp(req, res, next) {
    const { name, phone, email, password } = req.body;

    try {
      const user = await Customer.create(name, phone, email, password);
      const token = issueJWT(user);
      res.json({ token });
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
        const token = issueJWT(user);
        res.json({ token });
      } else {
        next(new Error('Invalid password'));
      }
    } catch (err) {
      next(err);
    }
  },
};

module.exports = authController;
