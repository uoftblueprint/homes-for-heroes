const { getMockReq, getMockRes } = require('@jest-mock/express');
const formController = require('../../../app/controllers/custom-form.controller');
const CustomForm = require('../../../app/models/custom-form.model');

const { res, next, mockClear } = getMockRes();
const mockError = new Error('error');
const mockUser = { user_id: 5, role_id: 1 };
const mockFormId = { form_id: 11 };
const mockFormBody = {
  title: 'Form',
  form_body: {},
  curr_level: ['l1', 'l3'],
  is_final: false,
};

describe("'Custom Form Controller unit tests' ", () => {
  beforeEach(() => {
    mockClear(); // can also use clearMockRes()
    jest.clearAllMocks();
  });

  test("'getCustomForm' 200", async () => {
    const mockResponse = {
      form_id: 1,
      title: 'test',
    };
    jest.spyOn(CustomForm, 'queryForm').mockReturnValue(mockResponse);
    const req = getMockReq({ params: mockFormId, user: mockUser });

    await formController.getCustomForm(req, res, next);
    expect(CustomForm.queryForm).toHaveBeenCalledWith(mockFormId);
    expect(res.send).toHaveBeenCalledWith(mockResponse);
  });

  test("'getCustomForm' query error", async () => {
    const req = getMockReq({ params: mockFormId });
    jest.spyOn(CustomForm, 'queryForm').mockRejectedValue(mockError);
    await formController.getCustomForm(req, res, next);

    expect(CustomForm.queryForm).toHaveBeenCalledWith(mockFormId);
    expect(res.send).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledWith(mockError);
  });

  test("'updateCustomForm' 200", async () => {
    const req = getMockReq({ body: mockFormBody, param: mockFormId });
    jest.spyOn(CustomForm.prototype, 'update')
        .mockReturnValue({});
    await formController.updateCustomForm(req, res, next);

    expect(CustomForm.prototype.update).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({message: 'success!'});
  });

  test("'updateCustomForm' form id error", async () => {
    jest
        .spyOn(CustomForm.prototype, 'update')
        .mockRejectedValue(new TypeError('form id undefined'))
    const req = getMockReq({ body: mockFormBody });
    await formController.updateCustomForm(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(
        new TypeError('form id undefined')
    );
  });

  test("'createCustomForm' 200", async () => {
    jest
      .spyOn(CustomForm.prototype, 'create')
      .mockReturnValue(mockFormId.form_id);
    const req = getMockReq({ body: mockFormBody, user: mockUser });
    await formController.createCustomForm(req, res, next);

    expect(CustomForm.prototype.create).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(mockFormId);
  });

  test("'createCustomForm' user not found error", async () => {
    jest
        .spyOn(CustomForm.prototype, 'create')
        .mockReturnValue(mockFormId.form_id);
    const req = getMockReq({ body: mockFormBody });
    await formController.createCustomForm(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(
        new TypeError('Cannot read properties of undefined (reading \'user_id\')')
    );
  });

  test("'queryAllAdminForms' 200", async () => {
    const req = getMockReq();
    await formController.queryAllAdminForms(req, res, next);
    expect(CustomForm.queryForm).toHaveBeenCalledTimes(1);
  });

  test("'publishForm' 200", async () => {
    const req = getMockReq({ body: mockFormId });
    jest
        .spyOn(CustomForm, 'publish')
        .mockReturnValue({});
    await formController.publishForm(req, res, next);
    expect(CustomForm.publish).toHaveBeenCalledWith(mockFormId.form_id);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  test("'publishForm' empty body error", async () => {
    const req = getMockReq({ body: {} });
    jest.spyOn(CustomForm, 'publish')
        .mockRejectedValue(new TypeError('form id not found'))
    await formController.publishForm(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(new TypeError('form id not found'))
  });
});
