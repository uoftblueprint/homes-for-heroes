const Admin = require('../models/admin.model');
const Chapter = require('../models/chapter.model');
const Supervisor = require('../models/supervisor.model');
const logger = require('../logger');

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

  async makeSupervisor(req, res, next) {
    try {
      const { admin_id } = req.params;
      const results = await Admin.makeSupervisor(admin_id);
      res.send(results);
    } catch (err) {
      next(err);
    }
  },
  async unsetSupervisor(req, res, next) {
    try {
      const { admin_id } = req.params;
      const results = await Admin.unsetSupervisor(admin_id);
      res.send(results);
    } catch (err) {
      next(err);
    }
  },

  async makeSuperadmin(req, res, next) {
    try {
      const { admin_id } = req.params;
      const results = await Admin.makeSuperadmin(admin_id); 
      res.send(results);
    } catch (err) {
      next(err);
    }
  },

  async unsetSuperadmin(req, res, next) {
    try {
      const { admin_id } = req.params;
      const results = await Admin.unsetSuperadmin(admin_id);
      res.send(results);
    } catch (err) {
      next(err);
    }
  },


  async getByChapter(req, res, next) {
    try {
      const { chapter } = req.params;
      const chapter_id = await Chapter.getId(chapter);
      logger.debug(chapter_id);
      const results = await Supervisor.listByChapter(chapter_id);
      res.send(results);
    } catch (err) {
      next(err);
    }
  },

  async assignChapter(req, res, next) {
    try {
      const chapter_name = req.body.name;
      const { admin_id } = req.params;
      const chapter_id = await Chapter.getId(chapter_name);
      logger.debug(chapter_id);
      const results = await Supervisor.assignChapter(admin_id, chapter_id);
      res.send(results);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = adminController;