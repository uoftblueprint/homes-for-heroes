const questionnaireController = require('../controllers/questionnaire.controller');
const validationSchema = require('../validators/questionnaire.validation');
const validationErrorHandler = require('../middleware/validation-error-handler');
const { isAuthenticated, isPrivileged } = require('../auth/helpers');

module.exports = (app) => {
  app.get(
    '/questionnaire/get/:questionnaire_id',
    // isAuthenticated,
    validationSchema.getQuestionnaireSchema,
    validationErrorHandler,
    questionnaireController.getQuestionnaire,
  ); 

  app.get(
    '/questionnaire/queryCompletedQuestionnaires/:user_id',
    // isPrivileged,
    validationSchema.queryCompletedQuestionnairesSchema,
    validationErrorHandler,
    questionnaireController.queryCompletedQuestionnaires
  );

  app.post(
    '/questionnaire/create',
    // isPrivileged,
    validationSchema.createQuestionnaireSchema,
    validationErrorHandler,
    questionnaireController.createQuestionnaire
  );

};