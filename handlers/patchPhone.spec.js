const phoneService = require('../services/phoneService');
const patchPhone = require('./patchPhone');

jest.mock('../services/phoneService');
describe('patchPhone handler', () => {
  let mockedRequest;
  let mockedResponse;
  let mockedNext;
  let phone;

  beforeEach(() => {
    phone = {
      id: 1,
        number: '0435435345',
        isActive: false
    };

    mockedRequest = {
      // this is added by the withID handler
      phone
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

  it('should call patch from phones service', async () => {
    const req = mockedRequest;
    const res = mockedResponse();
    const next = mockedNext;
    await patchPhone(req, res, next);
    expect(phoneService.patch).toHaveBeenCalled()
  })

  it('should call patch from phones service with phone in request with active true', async () => {
    const req = mockedRequest;
    const res = mockedResponse();
    const next = mockedNext;
    phone.isActive = true;
    await patchPhone(req, res, next);
    expect(phoneService.patch).toHaveBeenCalledWith(phone)
  })

  it('should call json with response from phonesService', async () => {
    phoneService.patch.mockResolvedValue(phone);
    const req = mockedRequest;
    const res = mockedResponse();
    const next = mockedNext;
    await patchPhone(req, res, next);
    expect(res.json).toHaveBeenCalledWith(phone)
  })

  it('should call next if any error happens', async () => {
    const iAmAnError = {message: 'Hey Iam an error'};
    phoneService.patch.mockRejectedValue(iAmAnError);
    const req = mockedRequest;
    const res = mockedResponse();
    const next = mockedNext;
    await patchPhone(req, res, next);
    expect(next).toHaveBeenCalledWith(iAmAnError)
  })
})
