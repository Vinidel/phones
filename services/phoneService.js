const database = require('../database/models');

async function getAll() {
  return database.Phone.findAll();
}

async function patch(phone) {
  return database.Phone.update({isActive: phone.isActive}, {
    where: {
      id: phone.id
    }
  });
}

async function getById(id) {
  return database.Phone.findOne({
    where: {
      id: id,
    }
  })
}

module.exports = {
  getAll,
  patch,
  getById,
}
