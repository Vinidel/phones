const phoneService = require('../services/phoneService');
const withId = require('./withID');

jest.mock('../services/phoneService');
describe('withPhoneID handler', () => {
  let mockedRequest;
  let mockedResponse;
  let mockedNext;
  let phone;
  beforeEach(() => {
    phone = {
      id: 1,
      number: '0426662606',
    }
    mockedRequest = {
      params: {
        id: 1,
      }
    };
    mockedResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };
    mockedNext = jest.fn();
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })

  it('should call getById from phones service', async () => {
    const req = mockedRequest;
    const res = mockedResponse();
    const next = mockedNext;
    await withId(req, res, next);
    expect(phoneService.getById).toHaveBeenCalled()
  })

  it('should add phone to request', async () => {
    phoneService.getById.mockResolvedValue(phone);
    const req = mockedRequest;
    const res = mockedResponse();
    const next = mockedNext;
    await withId(req, res, next);
    expect(req.phone).toEqual(phone)
  })

  it('should call next with error if no phone found', async () => {
    const error = new Error('No phone found');
    error.status = 400;
    phoneService.getById.mockResolvedValue();
    const req = mockedRequest;
    const res = mockedResponse();
    const next = mockedNext;
    await withId(req, res, next);
    expect(next).toHaveBeenCalledWith(error)
  })

  it('should call next if any error happens', async () => {
    const iAmAnError = {message: 'Hey Iam an error'};
    phoneService.getById.mockRejectedValue(iAmAnError);
    const req = mockedRequest;
    const res = mockedResponse();
    const next = mockedNext;
    await withId(req, res, next);
    expect(next).toHaveBeenCalledWith(iAmAnError)
  })
})
