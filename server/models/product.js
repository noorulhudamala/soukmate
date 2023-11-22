// models/product.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); 
const Size = require('./size');
const ProductInventory = require('./productInventory');
const Review = require('./review');

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

Product.belongsToMany(Size, { through: ProductInventory });
Size.belongsToMany(Product, { through: ProductInventory });
ProductInventory.belongsTo(Product);
ProductInventory.belongsTo(Size);
Product.hasMany(Review);
Review.belongsTo(Product);

module.exports = Product;
