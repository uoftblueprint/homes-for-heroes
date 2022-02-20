module.exports = app => {
    const chapters = require("../controllers/chapter.controller");
  
    app.get('/chapters/getAll', chapters.getAll);
    app.post('/chapters/create', chapters.create);
  };