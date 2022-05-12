const { getMockReq, getMockRes } = require('@jest-mock/express');
const adminController = require('../../../app/controllers/admin.controller');
const Admin = require('../../../app/models/admin.model');
jest.mock('../../../app/models/admin.model');

Admin.mockImplementation(() => {
  return {
    listAll: jest.fn(),
    listByChapter: jest.fn(),
    makeSuperadmin: jest.fn(),
    unsetSuperadmin: jest.fn(),
    assignChapter: jest.fn(),
  };
});

const { res, next, clearMockRes } = getMockRes();
const mockAdminId = { admin_id: 1 };
const mockChapterId = { chapter_id: 1 };
const mockError = new Error('error');

describe('Admin Controller unit tests', () => {
  beforeEach(() => {
    clearMockRes();
    jest.clearAllMocks();
  });

  test('should list all admins successfully', async () => {
    const req = getMockReq();
    const mockResponse = {
      admins: 'admins test',
    };
    Admin.listAll.mockResolvedValue(mockResponse);
    await adminController.listAll(req, res, next);
    expect(Admin.listAll).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({ admins: mockResponse });
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  test('should give an error when listing all admins', async () => {
    const req = getMockReq();
    Admin.listAll.mockRejectedValue(mockError);
    await adminController.listAll(req, res, next);
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.send).toHaveBeenCalledTimes(0);
  });

  test('should list all admins of a chapter', async () => {
    const req = getMockReq({ params: mockChapterId });
    const mockResponse = {
      admins: 'admins test',
    };
    Admin.listByChapter.mockResolvedValue(mockResponse);
    await adminController.listByChapter(req, res, next);
    expect(Admin.listByChapter).toHaveBeenCalledWith(mockChapterId.chapter_id);
    expect(res.send).toHaveBeenCalledWith(mockResponse);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  test('should give an error when listing all admins of a chapter', async () => {
    const req = getMockReq({ params: mockChapterId });
    Admin.listByChapter.mockRejectedValue(mockError);
    await adminController.listByChapter(req, res, next);
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.send).toHaveBeenCalledTimes(0);
  })

  test('should set superadmin status of an admin', async () => {
    const req = getMockReq({ params: mockAdminId });
    await adminController.makeSuperadmin(req, res, next);
    expect(Admin.makeSuperadmin).toHaveBeenCalledTimes(1);
    expect(Admin.makeSuperadmin).toHaveBeenCalledWith(mockAdminId.admin_id);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  test('should give an error when setting superadmin status of an admin', async () => {
    const req = getMockReq({ params: mockAdminId });
    Admin.makeSuperadmin.mockRejectedValue(mockError);
    await adminController.makeSuperadmin(req, res, next);
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.send).toHaveBeenCalledTimes(0);
  })

  test('should unset superadmin status of an admin', async () => {
    const req = getMockReq({ params: mockAdminId });
    await adminController.unsetSuperadmin(req, res, next);
    expect(Admin.unsetSuperadmin).toHaveBeenCalledTimes(1);
    expect(Admin.unsetSuperadmin).toHaveBeenCalledWith(mockAdminId.admin_id);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  test('should give an error when unsetting superadmin status of an admin', async () => {
    const req = getMockReq({ params: mockAdminId });
    Admin.unsetSuperadmin.mockRejectedValue(mockError);
    await adminController.unsetSuperadmin(req, res, next);
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.send).toHaveBeenCalledTimes(0);
  });

  test('should assign chapter to an admin', async () => {
    const req = getMockReq({ params: mockAdminId, body: mockChapterId });
    await adminController.assignChapter(req, res, next);
    expect(Admin.assignChapter).toHaveBeenCalledTimes(1);
    expect(Admin.assignChapter).toHaveBeenCalledWith(
      mockAdminId.admin_id,
      mockChapterId.chapter_id
    );
  });

  test('should give an error when assining chapter to an admin', async () => {
    const req = getMockReq({ params: mockAdminId, body: mockChapterId });
    Admin.assignChapter.mockRejectedValue(mockError);
    await adminController.assignChapter(req, res, next);
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.send).toHaveBeenCalledTimes(0);
  })
});
