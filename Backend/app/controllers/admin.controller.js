const Admin = require('../models/admin.model');

const adminController = {
  async createAdmin(req, res, next) {
    const { name, email, phone, password, chapter_id } = req.body;
    try {
      const admin = await Admin.create(
        name,
        email,
        phone,
        password,
        chapter_id,
        1
      );
      res.json(admin);
    } catch (err) {
      next(err);
    }
  },

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
      //const chapter_id = await Chapter.getId(chapter);
      const chapterAdmins = await Admin.listByChapter(chapter_id);
      res.send(chapterAdmins);
    } catch (err) {
      next(err);
    }
  },

  async assignChapter(req, res, next) {
    try {
      const chapter_id = req.body.chapter_id;
      const { admin_id } = req.params;
      await Admin.assignChapter(admin_id, chapter_id);
      res.send({ success: true });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = adminController;