const express = require('express');
const router = express.Router();
const productInventoryController = require('../controllers/productInventoryController');

router.get('/:id', productInventoryController.getProductInventory);

module.exports = router;
