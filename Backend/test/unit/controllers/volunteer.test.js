const { getMockReq, getMockRes } = require('@jest-mock/express');
const volunteerController = require('../../../app/controllers/volunteer.controller');
const Volunteer = require('../../../app/models/volunteer.model');

const mockVolunteerInfo = { info_1: 'value_1' };
const mockPage = { page: 'page_mock' };
const mockError = new Error('mock Error');

jest.mock('../../../app/models/volunteer.model', () => ({
  queryData: jest.fn(),
  listAll: jest.fn(),
  updateInfo: jest.fn(),
}));

const { res, next, clearMockRes } = getMockRes();

describe('Volunteer Controller unit tests', () => {
  beforeEach(() => {
    clearMockRes();
    jest.clearAllMocks();
  });

  test('should list all volunteers successfully', async () => {
    const req = getMockReq();
    const mockResponse = {
      volunteers: 'testVolunteers',
    };
    Volunteer.listAll.mockResolvedValue(mockResponse);
    await volunteerController.getAllVolunteers(req, res, next);
    expect(Volunteer.listAll).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({ volunteers: mockResponse });
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  test('should give an error when listing all volunteers', async () => {
    const req = getMockReq();
    Volunteer.listAll.mockRejectedValue(mockError);
    await volunteerController.getAllVolunteers(req, res, next);
    expect(Volunteer.listAll).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.send).toHaveBeenCalledTimes(0);
  });

  test('should update volunteer info successfully', async () => {
    const req = getMockReq({ body: mockVolunteerInfo });
    const mockResponse = {
      updated: 'mock_updated',
    };
    Volunteer.updateInfo.mockResolvedValue(mockResponse);
    await volunteerController.updateInfo(req, res, next);
    expect(Volunteer.updateInfo).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ success: true });
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  test('should give an error when updating volunteer info', async () => {
    const req = getMockReq({ body: mockVolunteerInfo });
    Volunteer.updateInfo.mockRejectedValue(mockError);
    await volunteerController.updateInfo(req, res, next);
    expect(Volunteer.updateInfo).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.json).toHaveBeenCalledTimes(0);
  });

  test('should get Volunteer data successfully', async () => {
    const req = getMockReq({ query: mockVolunteerInfo });
    const mockResponse = [mockPage, mockVolunteerInfo];
    Volunteer.queryData.mockResolvedValue(mockResponse);
    await volunteerController.getData(req, res, next);
    expect(Volunteer.queryData).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith(mockResponse);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  test('sould give an error when getting Volunteer data', async () => {
    const req = getMockReq({ query: mockVolunteerInfo });
    Volunteer.queryData.mockRejectedValue(mockError);
    await volunteerController.getData(req, res, next);
    expect(Volunteer.queryData).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.send).toHaveBeenCalledTimes(0);
  });
});
