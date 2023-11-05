// models/product.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); // Import your Sequelize instance

const Product = sequelize.define("Product", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_details: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  images_list: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  features: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Product;
