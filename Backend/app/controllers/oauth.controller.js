const OAuth = require('../models/oauth.model');
const Customer = require('../models/customer.model');
const { issueUserJWT } = require('../auth/helpers');

const generalizedRedirect = async (req, res, next) => {
  const profile = req.user;
  try {
    const user_id = await OAuth.getUserId(profile.provider, profile.id);
    if (user_id === -1) {
      // TODO: get the phone number from somewhere
      const user = await Customer.createOAuth(
        profile.displayName,
        profile.emails[0].value,
      );
      OAuth.create(user.user_id, profile.provider, profile.id);
      const token = issueUserJWT(user);

      // TODO: Store jwt in localstorage then redirect
      res.json({ token });
    } else {
      const user = await Customer.getById(user_id);
      const token = issueUserJWT(user);
      res.json({ token });
    }
  } catch (err) {
    next(err);
  }
};

const oauthController = {
  async googleRedirect(req, res, next) {
    await generalizedRedirect(req, res, next);
  },
  async facebookRedirect(req, res, next) {
    await generalizedRedirect(req, res, next);
  },
};

module.exports = oauthController;
