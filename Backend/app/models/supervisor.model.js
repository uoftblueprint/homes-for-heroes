const Admin = require('./admin.model');

// constructor
const Supervisor = function () {
  this.role_id = 1;
};

Supervisor.listAll = function() {
  return Admin.listAllRole(1);
};

Supervisor.assignChapter = function(admin_id, chapter_id) {
  return Admin.assignChapter(admin_id, chapter_id);
};

Supervisor.listByChapter = function(chapter_id) {
  return Admin.listByChapter(chapter_id);
};

module.exports = Supervisor;