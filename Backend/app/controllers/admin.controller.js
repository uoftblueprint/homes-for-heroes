const Admin = require('../models/admin.model');
const Chapter = require('../models/chapter.model');
const logger = require('../logger');

const adminController = {
  async createAdmin(req, res, next) {
    const { name, email, phone, password, chapter_id } = req.body;
    try {
      const admin = await Admin.create(
        name,
        email,
        phone,
        password,
        chapter_id
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
      const role_id = await Admin.getRole(admin_id);
      if (role_id == 1) {
        await Admin.makeSuperadmin(admin_id);
        res.send({ success: true });
      } else {
        next(new Error('Not an admin, cannot set as superadmin.'));
      }
    } catch (err) {
      next(err);
    }
  },

  async unsetSuperadmin(req, res, next) {
    try {
      const { admin_id } = req.params;
      const role_id = await Admin.getRole(admin_id);
      if (role_id == 2) {
        await Admin.unsetSuperadmin(admin_id);
        res.send({ success: true });
      } else {
        next(new Error('Not a superadmin, cannot unset superadmin status.'));
      }
    } catch (err) {
      next(err);
    }
  },

  async listByChapter(req, res, next) {
    try {
      const { chapter } = req.params;
      const chapter_id = await Chapter.getId(chapter);
      const chapterAdmins = await Admin.listByChapter(chapter_id);
      res.send({ admins: chapterAdmins });
    } catch (err) {
      next(err);
    }
  },

  async assignChapter(req, res, next) {
    try {
      const chapter_name = req.body.name;
      const { admin_id } = req.params;
      const chapter_id = await Chapter.getId(chapter_name);
      const role_id = await Admin.getRole(admin_id);
      if (role_id == 1) {
        await Admin.assignChapter(admin_id, chapter_id);
        res.send({ success: true });
      } else {
        next(new Error('Can only assign chapters to admins'));
      }
    } catch (err) {
      next(err);
    }
  },
};

module.exports = adminController;
