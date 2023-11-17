'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Sizes', [
      { sizeLabel: '5', createdAt: new Date(), updatedAt: new Date() },
      { sizeLabel: '5.5', createdAt: new Date(), updatedAt: new Date() },
      { sizeLabel: '6', createdAt: new Date(), updatedAt: new Date() },
      { sizeLabel: '6.5', createdAt: new Date(), updatedAt: new Date() },
      { sizeLabel: '7', createdAt: new Date(), updatedAt: new Date() },
      { sizeLabel: '7.5', createdAt: new Date(), updatedAt: new Date() },
      { sizeLabel: '8', createdAt: new Date(), updatedAt: new Date() },
      { sizeLabel: '8.5', createdAt: new Date(), updatedAt: new Date() },
      { sizeLabel: '9', createdAt: new Date(), updatedAt: new Date() },
      { sizeLabel: '9.5', createdAt: new Date(), updatedAt: new Date() },
      { sizeLabel: '10', createdAt: new Date(), updatedAt: new Date() },
      { sizeLabel: '10.5', createdAt: new Date(), updatedAt: new Date() },
      { sizeLabel: '11', createdAt: new Date(), updatedAt: new Date() },
      { sizeLabel: '11.5', createdAt: new Date(), updatedAt: new Date() },
      // Add more sizes as needed
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('sizes', null, {});
  }
};
