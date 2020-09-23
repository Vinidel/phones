const userService = require('./userService');
const database = require('../database/models');

jest.mock('../database/models');
describe('userService', () => {
  let user;
  beforeEach(() => {
    user = {
      id: 1,
      name: 'Vinny',
      Phones: [
        {
          id: 1,
          phoneNumber: '04566656543',
          isActive: true,
        }
      ]
    }
  });


  it('should call findOne', async () => {
    const fakeId = 1;
    database.User.findOne.mockResolvedValue(user);
    await userService.getById(fakeId);
    expect(database.User.findOne).toHaveBeenCalledWith({
      include: [{
        model: database.Phone
      }],
      where: {
        id: fakeId
      }
    })
  });

})
