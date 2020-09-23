const database = require('../database/models');

async function getById(id) {
  return database.User.findOne({
    include: [{
      model: database.Phone
    }],
    where: {
      id: id,
    }
  })
}

module.exports = {
  getById,
}
