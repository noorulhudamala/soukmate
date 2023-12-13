const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const TempCustomerCode = sequelize.define('TempCustomerCode', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = TempCustomerCode;