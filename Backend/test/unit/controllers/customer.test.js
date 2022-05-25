const { getMockReq, getMockRes } = require('@jest-mock/express');
const customerController = require('../../../app/controllers/customer.controller');
const Customer = require('../../../app/models/customer.model');

const changePassword = jest.fn();
const isValidPassword = jest.fn();
const mockVerifiedUser = { user_id: 1, verified: true, role_id: 1, changePassword, isValidPassword };
const mockUnverifiedUser = { user_id: 1, verified: false, role_id: 1, changePassword, isValidPassword };

jest.mock('../../../app/models/customer.model', () => ({
  getById: jest.fn(),
  updateUserInfo: jest.fn(),
  verify: jest.fn(),
  getByEmail: jest.fn(),
  createTemp: jest.fn(),
  createUserInfo: jest.fn(),
  getCustomerInfo: jest.fn(),
  retrieveAll: jest.fn(),
  getAlertCase: jest.fn(),
  getAlertCaseId: jest.fn(),
  setAlertCaseId: jest.fn(),
  queryUserData: jest.fn()
}));

const { res, next, clearMockRes } = getMockRes();

describe('Customer Controller unit tests', () => {

  beforeEach(() => {
    clearMockRes();
  });

  test('should get customer info', async () => {
    const req = getMockReq({ params: { user_id: 1 } });
    Customer.getCustomerInfo.mockResolvedValueOnce(mockUnverifiedUser);

    await customerController.getCustomerInfo(req, res, next);

    await expect(res.send).toBeCalledWith({ customerInfo: mockUnverifiedUser });
  });

  test('should get self customer info', async () => {
    const req = getMockReq({ user: { user_id: 1 } });
    Customer.getCustomerInfo.mockResolvedValueOnce(mockUnverifiedUser);

    await customerController.getSelfCustomerInfo(req, res, next);

    await expect(res.send).toBeCalledWith({ customerInfo: mockUnverifiedUser });
  });

  test('should get all users', async () => {
    const req = getMockReq();

    await customerController.getAllUsers(req, res, next);

    await expect(Customer.retrieveAll).toBeCalled();
    await expect(res.send).toBeCalled();
  });

  test('should get alert case', async () => {
    const req = getMockReq({ params: { user_id: 1 } });
    Customer.getAlertCase.mockResolvedValueOnce({ id: 1 });

    await customerController.getAlertCase(req, res, next);

    await expect(res.json).toBeCalledWith({ id: 1 });
  });

  test('should error if no alert case', async () => {
    const req = getMockReq({ params: { user_id: 1 } });
    Customer.getAlertCase.mockResolvedValueOnce(null);

    await customerController.getAlertCase(req, res, next);

    await expect(next).toBeCalled();
  });

  test('should get alert case id', async () => {
    const req = getMockReq({ params: { user_id: 1 } });
    Customer.getAlertCaseId.mockResolvedValueOnce(1);

    await customerController.getAlertCaseID(req, res, next);

    await expect(res.send).toBeCalledWith({ id: 1 });
  });

  test('should set alert case id', async () => {
    const req = getMockReq({ params: { user_id: 1 }, query: { case_id: 1 } });

    await customerController.setAlertCase(req, res, next);

    await expect(Customer.setAlertCaseId).toBeCalledWith(1, 1);
    await expect(res.send).toBeCalledWith({ success: true });
  });

  test('should get user data (admin)', async () => {
    const req = getMockReq({ user: { role_id: 2, chapter_id: 1 }, query: {} });

    Customer.queryUserData.mockResolvedValueOnce({ user_data: { user: mockVerifiedUser } });

    await customerController.getUserData(req, res, next);

    await expect(Customer.queryUserData).toBeCalledWith({});
    await expect(res.send).toBeCalledWith({ user_data: { user: mockVerifiedUser } });
  });

  test('should get user data (supervisor)', async () => {
    const req = getMockReq({ user: { role_id: 1, chapter_id: 1 } });

    Customer.queryUserData.mockResolvedValueOnce({ user_data: { user: mockVerifiedUser } });

    await customerController.getUserData(req, res, next);

    await expect(Customer.queryUserData).toBeCalledWith({ chapter_id: 1 });
    await expect(res.send).toBeCalledWith({ user_data: { user: mockVerifiedUser } });
  });

  test('should not get user data', async () => {
    const req = getMockReq({ user: { role_id: 0 } });

    await customerController.getUserData(req, res, next);

    await expect(next).toBeCalledWith(new Error('Insufficient Permissions'));
  });

  test('should change password', async () => {
    const req = getMockReq({ user: mockVerifiedUser, body: { newPassword: 'test', 'oldPassword': 'old' } });

    mockVerifiedUser.isValidPassword.mockResolvedValueOnce(true);

    await customerController.patchChangePassword(req, res, next);

    await expect(mockVerifiedUser.changePassword).toBeCalledWith('test');
    await expect(res.send).toBeCalledWith({ success: true });
  });

  test('should not change password', async () => {
    const req = getMockReq({ user: mockVerifiedUser, body: { newPassword: 'test', 'oldPassword': 'old' } });

    mockVerifiedUser.isValidPassword.mockResolvedValueOnce(false);

    await customerController.patchChangePassword(req, res, next);

    await expect(next).toBeCalledWith(new Error('Old password incorrect'));
  });

});