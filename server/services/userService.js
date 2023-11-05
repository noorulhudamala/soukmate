const { User } = require('../models');

exports.createUser = async (userData) => {
  return await User.create(userData);
};