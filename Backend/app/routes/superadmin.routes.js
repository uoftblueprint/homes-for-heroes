const superadminController = require('../controllers/superadmin.controller');
const { isSuperAdmin } = require('../auth/helpers');

module.exports = app => {
  app.get(
    '/superadmins/getAll',
    // isSuperAdmin,
    superadminController.getAll
  );
};