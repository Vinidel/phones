const phoneService = require('./phoneService');
const database = require('../database/models');

jest.mock('../database/models');
describe('phoneService', () => {
  let phone;
  beforeEach(() => {
    phone = {
      id: 1,
      isActive: false,
      number: '0456665676',
    }
  });

  it('should call findAll', async () => {
    database.Phone.findAll.mockResolvedValue([phone]);
    await phoneService.getAll();
    expect(database.Phone.findAll).toHaveBeenCalled()
  });

  it('should call update', async () => {
    database.Phone.update.mockResolvedValue(1);
    await phoneService.patch(phone);
    expect(database.Phone.update).toHaveBeenCalledWith({isActive: phone.isActive}, {
      where: {
        id: phone.id,
      }
    })
  });

  it('should call findOne', async () => {
    const fakeId = 1;
    database.Phone.findOne.mockResolvedValue([phone]);
    await phoneService.getById(fakeId);
    expect(database.Phone.findOne).toHaveBeenCalledWith({
      where: {
        id: fakeId
      }
    })
  });

})
