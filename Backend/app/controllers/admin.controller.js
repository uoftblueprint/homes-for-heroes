const Admin = require('../models/admin.model');

// Create and Save a new Customer

const adminController = {
  async getAdminInfo(req, res) {
    try {
      const { admin_id } = req.params;
      const info = await Admin.getAdminInfo(admin_id);
      res.send({ adminInfo: info });
    } catch (err) {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    }
  },

  async updateProfile(req, res) {
    try {
      const { admin_id } = req.params;
      const profile = await Admin.updateProfile(admin_id, req.query);
      res.send(profile);
    } catch (err) {
      console.error(err);
      res.send({"error": err});
    }
  }
};

module.exports = adminController;

