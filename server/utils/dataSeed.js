let data = require("../utils/amazon_uk_shoes_dataset.json");
const Product = require('../models/product')
const sequelize = require('../config/sequelize');
data = data.map((product) => {
  let price = product.price?.split(' ')
  price = +price?.[0]?.replace('£', '')
  return {
    title: product.title,
    price: price && price !== NaN ? price : 0,
    brand: product.brand,
    product_details: product.product_details,
    images_list: product.images_list.join(';'),
    features: JSON.stringify(product.features)
  }
});

const seedProducts = async () => {
    try {
      // Synchronize the database and recreate the products table
      await sequelize.sync({ force: true });
  
      // Insert the product data into the database
        await Product.bulkCreate(data)
  
      console.log('Seeding completed successfully.');
    } catch (error) {
      console.error('Error seeding data:', error);
    } finally {
      sequelize.close(); // Close the database connection when done
    }
  };
  
seedProducts();

  
  
  
  