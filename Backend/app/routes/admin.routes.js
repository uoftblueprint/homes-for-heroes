const adminController = require('../controllers/admin.controller');
const validationSchema = require('../validators/admin.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');
const { isSuperAdmin } = require('../auth/helpers');

module.exports = app => {
  app.get('/admins/getAll', isSuperAdmin, adminController.listAll);
  app.get('/admins/getSearchAdmins', isSuperAdmin, adminController.getSearchAdmins);

  app.put(
    '/admins/:admin_id/makeSupervisor',
    isSuperAdmin,
    validationSchema.makeSupervisorSchema,
    validationErrorHandler,
    adminController.makeSupervisor);

  app.put(
    '/admins/:admin_id/unsetSupervisor',
    isSuperAdmin,
    validationSchema.unsetSupervisorSchema,
    validationErrorHandler,
    adminController.unsetSupervisor);
  app.put(
    '/admins/:admin_id/makeSuperadmin',
    isSuperAdmin,
    validationSchema.makeSuperadminSchema,
    validationErrorHandler,
    adminController.makeSuperadmin);

  app.put(
    '/admins/:admin_id/unsetSuperadmin',
    isSuperAdmin,
    validationSchema.unsetSuperadminSchema,
    validationErrorHandler,
    adminController.unsetSuperadmin);
  app.put(
    '/admins/:admin_id/assignChapter',
    isSuperAdmin,
    validationSchema.assignChapterSchema,
    validationErrorHandler,
    adminController.assignChapter);

  app.get(
    '/admins/:chapter/listByChapter',
    isSuperAdmin,
    validationSchema.listChapterSupervisorsSchema,
    validationErrorHandler,
    adminController.getByChapter);
};