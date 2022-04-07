const Superadmin = require('../models/superadmin.model');

const superadminController = {
  async getAll(req, res) {
    try {
      const superadmins = await Superadmin.listAll();
      res.send({ superadmin: superadmins });
    } catch (err) {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    }
  }
};

module.exports = superadminController;