const { getMockReq, getMockRes } = require('@jest-mock/express');
const superadminController = require('../../app/controllers/superadmin.controller');
const Superadmin = require('../../app/models/superadmin.model');
jest.mock('../../app/models/superadmin.model');

Superadmin.mockImplementation(() => {
  return {
    listAll: jest.fn(),
  };
});

const { res, next, mockClear } = getMockRes();

describe('Superadmin Controller unit tests', () => {
  beforeEach(() => {
    mockClear();
    jest.clearAllMocks();
  });

  test('should list all superadmins', async () => {
    const req = getMockReq();
    const mockResponse = {
      superadmins: 'superadmins test',
    };
    Superadmin.listAll.mockResolvedValue(mockResponse);
    await superadminController.getAll(req, res, next);
    expect(Superadmin.listAll).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  test('should give an error when listing all superadmins', async () => {
    const req = getMockReq();
    Superadmin.listAll.mockRejectedValue(new Error('mock error'));
    await superadminController.getAll(req, res, next);
    expect(next).toHaveBeenCalledWith(new Error('mock error'));
    expect(res.send).toHaveBeenCalledTimes(0);
  });
});
