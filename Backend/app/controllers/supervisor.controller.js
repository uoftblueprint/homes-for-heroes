const Supervisor = require('../models/supervisor.model');
const Chapter = require('../models/chapter.model');
const logger = require('../logger');

const supervisorController = {
  async getAll(req, res, next) {
    try {
      const supervisors = await Supervisor.listAll();
      res.send({ supervisors: supervisors });
    } catch (err) {
      next(err);
    }
  },

  async getByChapter(req, res, next) {
    try {
      const { chapter } = req.params;
      logger.debug('getByChapter: %s', chapter);
      const chapter_id = await Chapter.getId(chapter);
      const supervisors = await Supervisor.listByChapter(chapter_id);
      logger.debug('getByChapter: %o', supervisors);
      res.send({ supervisors: supervisors });
    } catch (err) {
      next(err);
    }
  },

  async assignChapter(req, res, next) {
    try { 
      const chapter_id = req.body.id;
      const { admin_id } = req.params;
      const results = await Supervisor.assignChapter(admin_id, chapter_id);
      res.send({ supervisor: results });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = supervisorController;