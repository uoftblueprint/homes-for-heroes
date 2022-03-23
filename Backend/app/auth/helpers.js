require('dotenv').config();
const jwt = require('jsonwebtoken');

const helpers = {
  issueEmailJWT(user) {
    const payload = {
      id: user.user_id,
    };

    return jwt.sign(payload, process.env.JWT_EMAIL_SECRET, { expiresIn: '1d' });
  },
  verifyEmailJWT(token) {
    return jwt.verify(token, process.env.JWT_EMAIL_SECRET);
  },
  async isAuthenticated(req, res, next) {
    if(req.user)
      next();
    else
      next(new Error('User not authenticated'));
  }
};

module.exports = helpers;
