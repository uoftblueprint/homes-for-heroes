const { getMockReq, getMockRes } = require('@jest-mock/express');
const partnerController = require('../../../app/controllers/partner.controller');
const Partner = require('../../../app/models/partner.model');

const mockPartnerInfo = { info_1: 'value_1' };
const mockPage = { page: 'page_mock' };
const mockError = new Error('mock Error');

jest.mock('../../../app/models/partner.model', () => ({
  queryData: jest.fn(),
  listAll: jest.fn(),
  updateInfo: jest.fn(),
}));

const { res, next, clearMockRes } = getMockRes();

describe('Partner Controller unit tests', () => {
  beforeEach(() => {
    clearMockRes();
    jest.clearAllMocks();
  });

  test('should list all partners successfully', async () => {
    const req = getMockReq();
    const mockResponse = {
      partners: 'testPartners',
    };
    Partner.listAll.mockResolvedValue(mockResponse);
    await partnerController.getAllPartners(req, res, next);
    expect(Partner.listAll).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({ partners: mockResponse });
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  test('should give an error when listing all partners', async () => {
    const req = getMockReq();
    Partner.listAll.mockRejectedValue(mockError);
    await partnerController.getAllPartners(req, res, next);
    expect(Partner.listAll).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.send).toHaveBeenCalledTimes(0);
  });

  test('should update partner info successfully', async () => {
    const req = getMockReq({ body: mockPartnerInfo });
    const mockResponse = {
      updated: 'mock_updated',
    };
    Partner.updateInfo.mockResolvedValue(mockResponse);
    await partnerController.updateInfo(req, res, next);
    expect(Partner.updateInfo).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ success: true });
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  test('should give an error when updating partner info', async () => {
    const req = getMockReq({ body: mockPartnerInfo });
    Partner.updateInfo.mockRejectedValue(mockError);
    await partnerController.updateInfo(req, res, next);
    expect(Partner.updateInfo).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.json).toHaveBeenCalledTimes(0);
  });

  test('should get Partner data successfully', async () => {
    const req = getMockReq({ query: mockPartnerInfo });
    const mockResponse = [mockPage, mockPartnerInfo];
    Partner.queryData.mockResolvedValue(mockResponse);
    await partnerController.getData(req, res, next);
    expect(Partner.queryData).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith(mockResponse);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  test('sould give an error when getting Partner data', async () => {
    const req = getMockReq({ query: mockPartnerInfo });
    Partner.queryData.mockRejectedValue(mockError);
    await partnerController.getData(req, res, next);
    expect(Partner.queryData).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.send).toHaveBeenCalledTimes(0);
  });
});
