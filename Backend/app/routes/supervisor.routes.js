module.exports = app => {
  const supervisors = require('../controllers/supervisor.controller');
  
  app.get('/supervisors/getAll', supervisors.getAll);
  app.put('/supervisors/:admin_id/assignChapter', supervisors.assignChapter);
  app.get('/supervisors/:chapter/listByChapter', supervisors.getByChapter);
};