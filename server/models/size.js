const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); 

const Size = sequelize.define('Size', {
    sizeLabel: {
      type: DataTypes.STRING,
      allowNull: false
    }
});

module.exports = Size;
