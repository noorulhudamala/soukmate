let data = require("../utils/adidas_usa.json");
const Product = require('../models/product')
const sequelize = require('../config/sequelize');
data = data.filter(d => d.category === 'Shoes')
data = data.map((product) => {
  return {
    title: product.name,
    price: product.selling_price || 0,
    brand: product.brand,
    description: product.description,
    images_list: product.images,
    availability: product.availability, 
    color: product.color,
    category: product.category, 
    average_rating: product.average_rating,
    reviews_count: product.reviews_count
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
      // sequelize.close(); // Close the database connection when done
    }
  };
  
seedProducts();

  
  
  
  