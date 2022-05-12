const { getMockReq, getMockRes } = require('@jest-mock/express');
const supporterController = require('../../../app/controllers/supporter.controller');
const Supporter = require('../../../app/models/supporter.model');
jest.mock('../../../app/models/supporter.model');

const mockSupporterInfo = { info_1: 'value_1' };
const mockPage = { page: 'page_mock' };
const mockSupporterId = 1;
const mockError = new Error('mock Error');

Supporter.mockImplementation(() => {
  return {
    queryData: jest.fn(),
    listAll: jest.fn(),
    updateInfo: jest.fn(),
  };
});

const { res, next, clearMockRes } = getMockRes();

describe('Supporter Controller unit tests', () => {
  beforeEach(() => {
    clearMockRes();
    jest.clearAllMocks();
  });

  test('should list all supporters successfully', async () => {
    const req = getMockReq();
    const mockResponse = {
      supporters: 'testSupporters',
    };
    Supporter.listAll.mockResolvedValue(mockResponse);
    await supporterController.getAllSupporters(req, res, next);
    expect(Supporter.listAll).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({ supporters: mockResponse });
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  test('should give an error when listing all supporters', async () => {
    const req = getMockReq();
    Supporter.listAll.mockRejectedValue(mockError);
    await supporterController.getAllSupporters(req, res, next);
    expect(Supporter.listAll).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.send).toHaveBeenCalledTimes(0);
  });

  test('should update supporter info successfully', async () => {
    const req = getMockReq({ body: mockSupporterInfo });
    const mockResponse = {
      updated: 'mock_updated',
    };
    Supporter.updateInfo.mockResolvedValue(mockResponse);
    await supporterController.updateInfo(req, res, next);
    expect(Supporter.updateInfo).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ success: true });
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  test('should give an error when updating supporter info', async () => {
    const req = getMockReq({ body: mockSupporterInfo });
    Supporter.updateInfo.mockRejectedValue(mockError);
    await supporterController.updateInfo(req, res, next);
    expect(Supporter.updateInfo).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.json).toHaveBeenCalledTimes(0);
  });

  test('should get Supporter data successfully', async () => {
    const req = getMockReq({ query: mockSupporterInfo });
    const mockResponse = [mockPage, mockSupporterInfo];
    Supporter.queryData.mockResolvedValue(mockResponse);
    await supporterController.getData(req, res, next);
    expect(Supporter.queryData).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith(mockResponse);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  test('sould give an error when getting Supporter data', async () => {
    const req = getMockReq({ query: mockSupporterInfo });
    Supporter.queryData.mockRejectedValue(mockError);
    await supporterController.getData(req, res, next);
    expect(Supporter.queryData).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.send).toHaveBeenCalledTimes(0);
  });
});
