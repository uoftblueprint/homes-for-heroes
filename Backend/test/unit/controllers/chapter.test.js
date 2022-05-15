const { getMockReq, getMockRes } = require('@jest-mock/express');
const chapterController = require('../../../app/controllers/chapter.controller');
const Chapter = require('../../../app/models/chapter.model');

jest.mock('../../../app/models/chapter.model', () => ({
  listAll: jest.fn(),
}));

const { res, next, mockClear } = getMockRes();
const mockError = new Error('error');

describe('Chapter Controller unit tests', () => {
  beforeEach(() => {
    mockClear();
    jest.clearAllMocks();
  });

  test('should list all chapters', async () => {
    const req = getMockReq();
    const mockResponse = {
      chapters: 'chapters test',
    };
    Chapter.listAll.mockResolvedValue(mockResponse);
    await chapterController.getAll(req, res, next);
    expect(Chapter.listAll).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  test('should give an error when listing all chapters', async () => {
    const req = getMockReq();
    Chapter.listAll.mockRejectedValue(mockError);
    await chapterController.getAll(req, res, next);
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.send).toHaveBeenCalledTimes(0);
  });
});
