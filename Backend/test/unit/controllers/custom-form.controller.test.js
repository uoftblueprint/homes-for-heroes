const { getMockReq, getMockRes } = require('@jest-mock/express');
const formController = require('../../../app/controllers/custom-form.controller');
const CustomForm = require('../../../app/models/custom-form.model');

jest.mock('../../../app/models/custom-form.model', () => ({
  queryForm: jest.fn(),
  update: jest.fn(),
  publish: jest.fn(),
}));

const { res, next, mockClear } = getMockRes();
const mockError = new Error('error');
const mockFormParam = { form_id: 1 };
const mockFormBody = { form_id: 1, title: 'Form', form_body: {}, 'curr_level': 'l1', is_final: false };


describe('\'Custom Form Controller unit tests\' ', () => {
  beforeEach(() => {
    mockClear(); // can also use clearMockRes()
    jest.clearAllMocks();
  });

  test('\'getCustomForm\' 200', async () => {
    const req = getMockReq({ params: mockFormParam });
    const mockResponse = {
      form_id: 1,
      title: 'test'
    };
    CustomForm.queryForm.mockReturnValue(mockResponse);
    await formController.getCustomForm(req, res, next);
    expect(CustomForm.queryForm).toHaveBeenCalledWith(mockFormParam);
    expect(res.send).toHaveBeenCalledWith(mockResponse);
  });

  test('\'getCustomForm\' error', async () => {
    const req = getMockReq({ params: mockFormParam });

    CustomForm.queryForm.mockRejectedValue(mockError);
    await formController.getCustomForm(req, res, next);

    expect(CustomForm.queryForm).toHaveBeenCalledWith(mockFormParam);
    expect(res.send).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledWith(mockError);
  });

  test('\'queryAllAdminForms\' 200', async () => {
    const req = getMockReq();
    await formController.queryAllAdminForms(req, res, next);
    expect(CustomForm.queryForm).toHaveBeenCalledTimes(1);
  });

  test('\'publishForm\' 200', async () => {
    const req = getMockReq({ body: mockFormParam });
    await formController.publishForm(req, res, next);
    expect(CustomForm.publish).toHaveBeenCalledWith(mockFormParam.form_id);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

});
