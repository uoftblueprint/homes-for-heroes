const { getMockReq, getMockRes } = require('@jest-mock/express');
const authController = require('../../../app/controllers/auth.controller');
const Customer = require('../../../app/models/customer.model');
const Admin = require('../../../app/models/admin.model');
const {
  issueEmailJWT, issueResetJWT
} = require('../../../app/auth/helpers');

const changePassword = jest.fn();
const mockVerifiedUser = { user_id: 1, verified: true, role_id: 1, changePassword };
const mockUnverifiedUser = { user_id: 1, verified: false, role_id: 1, changePassword };
const validEmailJWT = issueEmailJWT({ user_id: 1 });
const validResetJWT = issueResetJWT({ user_id: 1 });

jest.mock('../../../app/models/customer.model', () => ({
  getById: jest.fn(),
  updateUserInfo: jest.fn(),
  verify: jest.fn(),
  getByEmail: jest.fn(),
  createTemp: jest.fn(),
  createUserInfo: jest.fn()
}));

jest.mock('../../../app/models/admin.model', () => ({
  createTemp: jest.fn(),
}));

const { res, next, clearMockRes } = getMockRes();

describe('Auth Controller unit tests', () => {

  beforeEach(() => {
    clearMockRes();
  });

  test('should sign up unverified customer', async () => {
    const req = getMockReq({ body: { jwt: validEmailJWT, password: 'test' } });
    Customer.getById.mockResolvedValueOnce(mockUnverifiedUser);

    await authController.signUp(req, res, next);

    await expect(Customer.updateUserInfo).toBeCalledWith(mockUnverifiedUser.user_id, req.body);
    await expect(mockUnverifiedUser.changePassword).toHaveBeenCalledWith('test');
    await expect(res.send).toBeCalledWith({ success: true });
  });

  test('should not sign up verified customer', async () => {
    const req = getMockReq({ body: { jwt: validEmailJWT, password: 'test' } });
    Customer.getById.mockResolvedValueOnce(mockVerifiedUser);

    await authController.signUp(req, res, next);

    await expect(next).toHaveBeenCalledWith(new Error('User is already signed up'));
  });

  test('should not sign up with invalid jwt', async () => {
    const req = getMockReq({ body: { jwt: 'invalid', password: 'test' } });
    Customer.getById.mockResolvedValueOnce(mockUnverifiedUser);

    await authController.signUp(req, res, next);

    await expect(next).toBeCalled();
  });

  test('should check valid jwt', async () => {
    const req = getMockReq({ params: { jwt: validEmailJWT } });
    Customer.getById.mockResolvedValueOnce(mockUnverifiedUser);

    await authController.checkJWT(req, res, next);

    await expect(res.send).toBeCalledWith({ role_id: mockUnverifiedUser.role_id });
  });

  test('should error invalid jwt', async () => {
    const req = getMockReq({ params: { jwt: 'invalid' } });
    Customer.getById.mockResolvedValueOnce(mockUnverifiedUser);

    await authController.checkJWT(req, res, next);

    await expect(next).toBeCalled();
  });

  test('should login', async () => {
    const req = getMockReq({ user: mockVerifiedUser, session: { cookie: { expires: 99 } } });

    await authController.login(req, res, next);

    await expect(res.send).toHaveBeenCalledWith({ user_id: 1, role_id: 1, expires: 99 });
  });

  test('should send forgot password', async () => {
    const req = getMockReq({ body: { email: 'john@gmail.com' } });
    Customer.getByEmail.mockResolvedValueOnce(mockVerifiedUser);

    await authController.forgotPassword(req, res, next);

    await expect(res.send).toBeCalledWith({ success: true });
  });

  test('should not send forgot password (missing user)', async () => {
    const req = getMockReq({ body: { email: 'john@gmail.com' } });
    Customer.getByEmail.mockRejectedValueOnce(new Error('User doesn\'t exist'));

    await authController.forgotPassword(req, res, next);

    await expect(next).toBeCalled();
  });

  test('should reset password', async () => {
    const req = getMockReq({ body: { newPassword: 'test', token: validResetJWT } });
    await mockVerifiedUser.changePassword.mockReset();
    await Customer.getById.mockResolvedValueOnce(mockVerifiedUser);

    await authController.resetPassword(req, res, next);

    await expect(mockVerifiedUser.changePassword).toBeCalledWith('test');
    await expect(res.send).toBeCalledWith({ success: true });
  });

  test('should not reset password', async () => {
    const req = getMockReq({ body: { newPassword: 'password', token: 'invalid' } });
    Customer.getById.mockResolvedValueOnce(mockVerifiedUser);

    await authController.resetPassword(req, res, next);

    await expect(next).toBeCalled();
  });

  test('should create veteran', async () => {
    const req = getMockReq({ body: { name: 'bob', email: 'john@gmail.com' }, user: { chapter_id: 1 } });
    Customer.createTemp.mockResolvedValueOnce(mockUnverifiedUser);

    await authController.createVeteran(req, res, next);

    await expect(Customer.createUserInfo).toBeCalledWith(mockUnverifiedUser.user_id);
    await expect(res.json).toBeCalledWith({ success: true });
  });

  test('should create admin', async () => {
    const req = getMockReq({ body: { name: 'bob', email: 'john@gmail.com', chapter_id: 1 } });
    Admin.createTemp.mockResolvedValueOnce(mockUnverifiedUser);

    await authController.createAdmin(req, res, next);

    await expect(res.json).toBeCalledWith({ success: true });
  });

});