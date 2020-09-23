const phoneService = require('../services/phoneService');
const getPhones = require('./getPhones');

jest.mock('../services/phoneService');
describe('getPhones handler', () => {
  let mockedRequest;
  let mockedResponse;
  let mockedNext;
  let phones;
  beforeEach(() => {
    phones = [{
      id: 1,
      number: '0426662606',
    }]
    mockedRequest = {};
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

  it('should call getAll from phones service', async () => {
    const req = mockedRequest;
    const res = mockedResponse();
    const next = mockedNext;
    await getPhones(req, res, next);
    expect(phoneService.getAll).toHaveBeenCalled()
  })

  it('should call json with response from phonesService', async () => {
    phoneService.getAll.mockResolvedValue(phones);
    const req = mockedRequest;
    const res = mockedResponse();
    const next = mockedNext;
    await getPhones(req, res, next);
    expect(res.json).toHaveBeenCalledWith(phones)
  })

  it('should call next if any error happens', async () => {
    const iAmAnError = {message: 'Hey Iam an error'};
    phoneService.getAll.mockRejectedValue(iAmAnError);
    const req = mockedRequest;
    const res = mockedResponse();
    const next = mockedNext;
    await getPhones(req, res, next);
    expect(next).toHaveBeenCalledWith(iAmAnError)
  })
})
