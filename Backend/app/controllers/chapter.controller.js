const Chapter = require('../models/chapter.model');

const chapterController = {
  async getAll(req, res, next) {
    try {
      const chapters = await Chapter.listAll();
      res.send({ chapters: chapters });
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const new_chapter = new Chapter(req.body);
      const chap_id = await new_chapter.create();
      res.json(chap_id);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = chapterController;