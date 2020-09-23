const getPhone = require('./getPhone');

describe('getPhone handler', () => {
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

  it('should call json with phone from request', async () => {
    const req = mockedRequest;
    const res = mockedResponse();
    const next = mockedNext;
    getPhone(req, res, next);
    expect(res.json).toHaveBeenCalledWith(phone)
  });
})
