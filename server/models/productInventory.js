const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); 
const ProductInventory = sequelize.define('ProductInventory', {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: { min: 0 }
  },
});
  
module.exports = ProductInventory;