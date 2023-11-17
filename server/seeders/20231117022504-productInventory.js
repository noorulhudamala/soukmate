'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProductInventories', [
      { productId: 1, sizeId: 1, quantity: 100, createdAt: new Date(), updatedAt: new Date() },
      { productId: 1, sizeId: 2, quantity: 50, createdAt: new Date(), updatedAt: new Date() },
      { productId: 1, sizeId: 3, quantity: 50, createdAt: new Date(), updatedAt: new Date() },
      { productId: 1, sizeId: 4, quantity: 50, createdAt: new Date(), updatedAt: new Date() },
      { productId: 1, sizeId: 5, quantity: 50, createdAt: new Date(), updatedAt: new Date() },
      { productId: 1, sizeId: 6, quantity: 50, createdAt: new Date(), updatedAt: new Date() },
      { productId: 1, sizeId: 7, quantity: 50, createdAt: new Date(), updatedAt: new Date() },
      { productId: 1, sizeId: 8, quantity: 50, createdAt: new Date(), updatedAt: new Date() },
      { productId: 1, sizeId: 9, quantity: 50, createdAt: new Date(), updatedAt: new Date() },
      { productId: 1, sizeId: 10, quantity: 50, createdAt: new Date(), updatedAt: new Date() },
      { productId: 1, sizeId: 11, quantity: 50, createdAt: new Date(), updatedAt: new Date() },
      // Add more entries as needed
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductInventories', null, {});
  }
};
