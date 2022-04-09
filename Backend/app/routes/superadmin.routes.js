const superadmins = require("../controllers/superadmin.controller");

module.exports = (app) => {
  app.get('/superadmins/getAll', superadmins.getAll);
};
