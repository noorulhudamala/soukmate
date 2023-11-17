const Size = require('../models/size');

exports.getSizes = async (req, res) => {
  try {
    const sizes = await Size.findAll();
    res.json(sizes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
