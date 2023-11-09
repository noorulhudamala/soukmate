// models/product.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); // Import your Sequelize instance

const Product = sequelize.define("Product", {
  title: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
  },
  brand: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  images_list: {
    type: DataTypes.STRING,
  },
  availability: {
    type: DataTypes.STRING,
  },
  color: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  average_rating: {
    type: DataTypes.DOUBLE,
  },
  reviews_count: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Product;
