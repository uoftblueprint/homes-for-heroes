const logger = require('../logger');

const oauthController = {
  async googleRedirect(req, res) {
    logger.info('User with id %s successfully logged in.', req.user.user_id);
    res.redirect('/');
  }
};

module.exports = oauthController;
