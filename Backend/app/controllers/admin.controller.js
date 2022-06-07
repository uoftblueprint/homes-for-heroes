const Admin = require('../models/admin.model');

const adminController = {
  async listAll(req, res, next) {
    try {
      const admins = await Admin.listAll();
      res.send({ admins: admins });
    } catch (err) {
      next(err);
    }
  },
    
  async getSearchAdmins(req, res, next) {
    try {
      const { name } = req.query;
      const admins = await Admin.getSearchAdmins(name);
      res.send({ admins: admins });
    } catch (err) {
      next(err);
    }
  }, 

  async deleteSupervisor(req, res, next) {
    try {
      const { admin_id } = req.params;
      const results = await Admin.deleteSupervisor(admin_id);
      res.send(results);
    } catch (err) {
      next(err);
    }
  },

  async makeSuperadmin(req, res, next) {
    try {
      const { admin_id } = req.params;
      //const role_id = await Admin.getRole(admin_id);
      await Admin.makeSuperadmin(admin_id);
      res.send({ success: true });
    } catch (err) {
      next(err);
    }
  },

  async unsetSuperadmin(req, res, next) {
    try {
      const { admin_id } = req.params;
      // const role_id = await Admin.getRole(admin_id);
      await Admin.unsetSuperadmin(admin_id);
      res.send({ success: true });
    } catch (err) {
      next(err);
    }
  },

  async listByChapter(req, res, next) {
    try {
      const { chapter_id } = req.params;
      const chapterAdmins = await Admin.listByChapter(chapter_id);
      res.send(chapterAdmins);
    } catch (err) {
      next(err);
    }
  },

  async assignChapter(req, res, next) {
    try {
      const { chapter_id } = req.body;
      const { admin_id } = req.params;
      await Admin.assignChapter(admin_id, chapter_id);
      res.send({ success: true });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = adminController;