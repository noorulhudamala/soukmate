'use strict';

const data = require('../utils/amazon_uk_shoes_products_dataset_2021_12.json');
function getRandomNumber() {
  return Math.floor(Math.random() * 426) + 1;
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

var startDate = new Date(2020, 0, 1); // January 1, 2020
var endDate = new Date(2023, 11, 31); // December 31, 2023

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const updatedData = data?.map(d => ({
      productId: getRandomNumber(),
      review_rating: d?.review_rating,
      review_text: d?.review_text,
      review_title: d?.review_title,  
      reviewer_name: d?.reviewer_name,
      review_date: randomDate(startDate, endDate)
    }))
    await queryInterface.bulkInsert('Reviews',updatedData , {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
