'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Phones', [{
      phoneNumber: '0456556545',
      isActive: false,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
        phoneNumber: '09090934',
        isActive: false,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        phoneNumber: '324234234234',
        isActive: false,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        phoneNumber: '3244233244',
        isActive: false,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Phones', null, {});
  }
};
