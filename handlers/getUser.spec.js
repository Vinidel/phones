const userService = require('../services/userService');
const getUser = require('./getUser');

jest.mock('../services/userService');
describe('getUser handler', () => {
  let mockedRequest;
  let mockedResponse;
  let mockedNext;
  let user;
  beforeEach(() => {
    user = {
      id: 1,
      name: 'Vinny',
      phones: [{
        id: 1,
        isActive: false,
        number: '0426555606',
      }]
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

  it('should call getById from user service', async () => {
    const req = mockedRequest;
    const res = mockedResponse();
    const next = mockedNext;
    await getUser(req, res, next);
    expect(userService.getById).toHaveBeenCalled()
  })

  it('should call json with response from service', async () => {
    userService.getById.mockResolvedValue(user);
    const req = mockedRequest;
    const res = mockedResponse();
    const next = mockedNext;
    await getUser(req, res, next);
    expect(res.json).toHaveBeenCalledWith(user)
  })

  it('should call next with error if no user is found', async () => {
    const error = new Error('No user found');
    error.status = 400;
    userService.getById.mockResolvedValue();
    const req = mockedRequest;
    const res = mockedResponse();
    const next = mockedNext;
    await getUser(req, res, next);
    expect(next).toHaveBeenCalledWith(error)
  })

  it('should call next if any error happens', async () => {
    const iAmAnError = {message: 'Hey Iam an error'};
    userService.getById.mockRejectedValue(iAmAnError);
    const req = mockedRequest;
    const res = mockedResponse();
    const next = mockedNext;
    await getUser(req, res, next);
    expect(next).toHaveBeenCalledWith(iAmAnError)
  })
})
