const admin = require("../controllers/admin.controller");
const validationSchema = require('../validators/admin.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');
const passport = require('passport');

module.exports = app => {
    app.get('/admins/getAll', admin.listAll);

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
        validationSchema.assignChapter,
        validationErrorHandler,
        admin.assignChapter);

    app.get(
        '/admins/:chapter/listByChapter', 
        validationSchema.listChapterSupervisorsSchema,
        validationErrorHandler,
        admin.getByChapter);
};