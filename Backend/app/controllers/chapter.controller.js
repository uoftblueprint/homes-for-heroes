const Chapter = require('../models/chapter.model');

const chapterController = {
  async getAll(req, res) {
    try {
      const chapters = await Chapter.listAll();
      res.send({ chapters: chapters });
    } catch (err) {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    }
  },

  async create(req, res) {
    try {
      const new_chapter = new Chapter(req.body);
      const chap_id = await new_chapter.create();
      res.json(chap_id);
    } catch (err) {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    }
  }
};

module.exports = chapterController;