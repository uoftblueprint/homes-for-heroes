const { getMockReq, getMockRes } = require('@jest-mock/express');
const { validationResult } = require('express-validator');
const validationSchema = require('../../../app/validators/custom-form.validation');
const customFormTestData = require('./custom-form-validator-test-data');

const { res, mockClear } = getMockRes();

testExpressValidatorMiddleware = async (req, res, middlewares) => {
    await Promise.all(middlewares.map(async (middleware) => {
        await middleware(req, res, () => undefined);
    }));
};


describe('\'Custom Form Validator unit tests\' ', () => {
    beforeEach(() => {
        mockClear(); // can also use clearMockRes()
        jest.clearAllMocks();
    });

    test('\'getCustomForm validator\' success', async () => {
        const req = getMockReq({ params: { form_id: 1 } });
        await testExpressValidatorMiddleware(req, res, validationSchema.getCustomFormSchema);
        const result = validationResult(req);
        expect(result.mapped()).toEqual({});
    });

    test('\'getCustomForm validator\' no form id', async () => {
        const req = getMockReq({ params: {} });
        await testExpressValidatorMiddleware(req, res, validationSchema.getCustomFormSchema);
        const result = validationResult(req);
        expect(result.mapped().form_id.msg).toEqual("Invalid form_id");
    });

    test('\'createCustomForm validator\' success', async () => {
        const req = getMockReq(
            {
                body: {
                    ...customFormTestData.validFormFields,
                    ...customFormTestData.validFormBody,
                }
            }
        );
        await testExpressValidatorMiddleware(req, res, validationSchema.createCustomFormSchema);
        const result = validationResult(req);
        expect(result.mapped()).toEqual({});
    });

    test('\'createCustomForm validator\' invalid fields', async () => {
        const req = getMockReq(
            {
                body: {
                    ...customFormTestData.invalidFormFields,
                    ...customFormTestData.validFormBody,
                }
            }
        );
        await testExpressValidatorMiddleware(req, res, validationSchema.createCustomFormSchema);
        const result = validationResult(req);
        expect(result.mapped().admin_id.msg).toEqual("Invalid admin_id");
        expect(result.mapped().title.msg).toEqual("Title cannot be empty");
    });

    test('\'createCustomForm validator\' invalid question required', async () => {
        const req = getMockReq(
            {
                body: {
                    ...customFormTestData.validFormFields,
                    ...customFormTestData.invalidRequiredFormBody,
                }
            }
        );
        await testExpressValidatorMiddleware(req, res, validationSchema.createCustomFormSchema);
        const result = validationResult(req);
        expect(result.mapped()["form_body.questions[0].required"].msg).toEqual("Is question required");
    });

    test('\'createCustomForm validator\' invalid question type', async () => {
        const req = getMockReq(
            {
                body: {
                    ...customFormTestData.validFormFields,
                    ...customFormTestData.invalidTypeFormBody,
                }
            }
        );
        await testExpressValidatorMiddleware(req, res, validationSchema.createCustomFormSchema);
        const result = validationResult(req);
        expect(result.mapped()["form_body.questions[3].type"].msg).toEqual("Invalid question type");
    });

    test('\'createCustomForm validator\' invalid input question', async () => {
        const req = getMockReq(
            {
                body: {
                    ...customFormTestData.validFormFields,
                    ...customFormTestData.invalidInputFormBody,
                }
            }
        );
        await testExpressValidatorMiddleware(req, res, validationSchema.createCustomFormSchema);
        const result = validationResult(req);
        expect(result.mapped()["form_body.questions[0].question"].msg).toEqual("Question cannot be empty");
    });

    test('\'createCustomForm validator\' invalid option question', async () => {
        const req = getMockReq(
            {
                body: {
                    ...customFormTestData.validFormFields,
                    ...customFormTestData.invalidOptionFormBody,
                }
            }
        );
        await testExpressValidatorMiddleware(req, res, validationSchema.createCustomFormSchema);
        const result = validationResult(req);
        expect(result.mapped()["form_body.questions[0].options"].msg).toEqual("At least one option is needed");
        expect(result.mapped()["form_body.questions[1].options[1]"].msg).toEqual("Option cannot be empty");
        expect(result.mapped()["form_body.questions[2].options"].msg).toEqual("Each option must be unique");
    });

    test('\'createCustomForm validator\' invalid option question', async () => {
        const req = getMockReq(
            {
                body: {
                    ...customFormTestData.validFormFields,
                    ...customFormTestData.invalidOptionFormBody,
                }
            }
        );
        await testExpressValidatorMiddleware(req, res, validationSchema.createCustomFormSchema);
        const result = validationResult(req);
        expect(result.mapped()["form_body.questions[0].options"].msg).toEqual("At least one option is needed");
        expect(result.mapped()["form_body.questions[1].options[1]"].msg).toEqual("Option cannot be empty");
        expect(result.mapped()["form_body.questions[2].options"].msg).toEqual("Each option must be unique");
    });

    test('\'createCustomForm validator\' invalid grid question', async () => {
        const req = getMockReq(
            {
                body: {
                    ...customFormTestData.validFormFields,
                    ...customFormTestData.invalidGridFormBody,
                }
            }
        );
        await testExpressValidatorMiddleware(req, res, validationSchema.createCustomFormSchema);
        const result = validationResult(req);
        expect(result.mapped()["form_body.questions[3].rows"].msg).toEqual("This question type requires rows");
        expect(result.mapped()["form_body.questions[4].rows[3]"].msg).toEqual("Row option cannot be empty");
        expect(result.mapped()["form_body.questions[5].rows"].msg).toEqual("Each option must be unique");
    });

    test('\'updateCustomForm validator\' success', async () => {
        const req = getMockReq(
            {
                params: { form_id: 1 },
                body: {
                    ...customFormTestData.validFormFields,
                    ...customFormTestData.validFormBody,
                }
            }
        );
        await testExpressValidatorMiddleware(req, res, validationSchema.updateCustomFormSchema);
        const result = validationResult(req);
        expect(result.mapped()).toEqual({});
    });

    test('\'publishCustomForm validator\' success', async () => {
        const req = getMockReq({ body: { form_id: 1 } });
        await testExpressValidatorMiddleware(req, res, validationSchema.publishFormSchema);
        const result = validationResult(req);
        expect(result.isEmpty()).toEqual(true);
    });

    test('\'publishCustomForm validator\' no form id', async () => {
        const req = getMockReq({ body: {} });
        await testExpressValidatorMiddleware(req, res, validationSchema.publishFormSchema);
        const result = validationResult(req);
        expect(result.mapped().form_id.msg).toEqual("Invalid form_id");
    });
});