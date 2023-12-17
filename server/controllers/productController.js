const Product  = require('../models/product'); 

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, thumbnail } = req.body;
    const product = await Product.create({ title, description, price, thumbnail });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { page = 1, pageSize = 12 } = req.query;

    const offset = (page - 1) * pageSize;
    const products = await Product.findAll({
      limit: pageSize,
      offset,
    });

    const totalProducts = await Product.count(); // Count total products

    res.json({
      products,
      totalPages: Math.ceil(totalProducts / pageSize),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, thumbnail } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      product.title = title;
      product.description = description;
      product.price = price;
      product.thumbnail = thumbnail;
      await product.save();
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      await product.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
