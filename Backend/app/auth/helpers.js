const jwt = require('jsonwebtoken');

const helpers = {
  issueUserJWT(user) {
    const payload = {
      id: user.user_id,
      role: 1, // TODO: Change role based on type of user (client: 1, admin: 2, superadmin: 3)
    };

    return jwt.sign(payload, 'CHANGEME', { expiresIn: '1d' });
  },
  verifyUserJWT(token) {
    return jwt.verify(token, 'CHANGEME');
  },
  issueEmailJWT(user) {
    const payload = {
      id: user.user_id,
    };

    return jwt.sign(payload, 'EMAIL_CHANGEME', { expiresIn: '1d' });
  },
  verifyEmailJWT(token) {
    return jwt.verify(token, 'EMAIL_CHANGEME');
  },
};

module.exports = helpers;
