const supervisorController = require('../controllers/supervisor.controller');
const { isSuperAdmin } = require('../auth/helpers');

module.exports = app => {
  app.get(
    '/supervisors/getAll',
    isSuperAdmin,
    supervisorController.getAll
  );

  app.put(
    '/supervisors/:admin_id/assignChapter',
    isSuperAdmin,
    supervisorController.assignChapter
  );

  app.get(
    '/supervisors/:chapter/listByChapter',
    isSuperAdmin,
    supervisorController.getByChapter
  );
};