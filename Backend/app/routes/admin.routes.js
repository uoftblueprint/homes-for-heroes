const admin = require('../controllers/admin.controller');
const validationSchema = require('../validators/admin.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');
const adminController = require('../controllers/admin.controller');

module.exports = app => {
  app.get('/admins/getAll', admin.listAll);
  app.get('/admins/getSearchAdmins', admin.getSearchAdmins);

  app.put(
    '/admins/:admin_id/makeSupervisor', 
    validationSchema.makeSupervisorSchema,
    validationErrorHandler,
    admin.makeSupervisor);

  app.put(
    '/admins/:admin_id/unsetSupervisor', 
    validationSchema.unsetSupervisorSchema,
    validationErrorHandler,
    admin.unsetSupervisor);
  app.put(
    '/admins/:admin_id/makeSuperadmin', 
    validationSchema.makeSuperadminSchema,
    validationErrorHandler,
    admin.makeSuperadmin);

  app.put(
    '/admins/:admin_id/unsetSuperadmin', 
    validationSchema.unsetSuperadminSchema,
    validationErrorHandler,
    admin.unsetSuperadmin);
  app.put(
    '/admins/:admin_id/assignChapter', 
    validationSchema.assignChapterSchema,
    validationErrorHandler,
    admin.assignChapter);

  app.get(
    '/admins/:chapter/listByChapter', 
    validationSchema.listChapterSupervisorsSchema,
    validationErrorHandler,
    admin.getByChapter);

  app.post(
      '/admins/createAdmin',
      validationSchema.createAdminSchema,
      validationErrorHandler,
      adminController.createAdmin,
    );
};