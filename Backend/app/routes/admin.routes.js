const adminController = require('../controllers/admin.controller');
const validationSchema = require('../validators/admin.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');

module.exports = app => {
  app.get('/admins/getAll', adminController.listAll);
  app.get('/admins/getSearchAdmins', adminController.getSearchAdmins);

  app.put(
    '/admins/:admin_id/makeSupervisor', 
    validationSchema.makeSupervisorSchema,
    validationErrorHandler,
    adminController.makeSupervisor);

  app.put(
    '/admins/:admin_id/unsetSupervisor', 
    validationSchema.unsetSupervisorSchema,
    validationErrorHandler,
    adminController.unsetSupervisor);
  app.put(
    '/admins/:admin_id/makeSuperadmin', 
    validationSchema.makeSuperadminSchema,
    validationErrorHandler,
    adminController.makeSuperadmin);

  app.put(
    '/admins/:admin_id/unsetSuperadmin',
    validationSchema.unsetSuperadminSchema,
    validationErrorHandler,
    adminController.unsetSuperadmin);
  app.put(
    '/admins/:admin_id/assignChapter', 
    validationSchema.assignChapterSchema,
    validationErrorHandler,
    adminController.assignChapter);

  app.get(
    '/admins/:chapter/listByChapter', 
    validationSchema.listChapterSupervisorsSchema,
    validationErrorHandler,
    adminController.getByChapter);
};