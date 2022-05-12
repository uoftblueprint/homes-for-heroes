const { getMockReq, getMockRes } = require('@jest-mock/express');
const superadminController = require('../../../app/controllers/superadmin.controller');
const Superadmin = require('../../../app/models/superadmin.model');
jest.mock('../../../app/models/superadmin.model');

Superadmin.mockImplementation(() => {
  return {
    listAll: jest.fn(),
  };
});

const { res, next, mockClear } = getMockRes();
const mockError = new Error('error');

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
    Superadmin.listAll.mockRejectedValue(mockError);
    await superadminController.getAll(req, res, next);
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.send).toHaveBeenCalledTimes(0);
  });
});
