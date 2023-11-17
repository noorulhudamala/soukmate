const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const sizeRoutes = require('./routes/sizeRoutes');
const productInventoryRoutes = require('./routes/productInventoryRoutes');
const sequelize = require('./config/sequelize');
app.use(cors());
app.use(express.json());
// require('./utils/dataSeed')
// Connect Sequelize to the database
sequelize.sync().then(() => {
  console.log('Database tables synchronized');
}).catch((e) => {
  console.log("======", e)
});

// Define API routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sizes', sizeRoutes);
app.use('/api/product-inventory', productInventoryRoutes);

// Error handling middleware

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});