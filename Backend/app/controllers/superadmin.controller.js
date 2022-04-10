const Superadmin = require('../models/superadmin.model');

const superadminController = {
  async getAll(req, res, next) {
    try {
      const superadmins = await Superadmin.listAll();
      res.send({ superadmin: superadmins });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = superadminController;