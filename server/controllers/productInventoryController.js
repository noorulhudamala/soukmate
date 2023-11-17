const ProductInventory = require('../models/productInventory');
const Size = require('../models/size');
const Product = require('../models/product');

exports.getProductInventory = async (req, res) => {
  const productId = req?.params?.id
  try {
    const product = await Product.findOne({
      where: { id: productId },
      include: [{
        model: Size,
        through: {
          model: ProductInventory,
          attributes: ['quantity'], // Include quantity from ProductInventory
        },
        attributes: ['sizeLabel', 'id'] // Attributes of Size to include
      }]
    });

    if (product) {
      res.json(product);
    } else {
      return 'Product not found';
    }

    
  } catch (error) {
    res.status(500).send(error.message);
  }
};
