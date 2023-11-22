const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Review = sequelize.define("Review", {
  review_rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  review_text: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  review_title: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  reviewer_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  review_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Review;
