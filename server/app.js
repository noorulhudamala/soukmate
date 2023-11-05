const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const sequelize = require('./config/sequelize');
app.use(cors());
app.use(express.json());
// require('./utils/dataSeed')
// Connect Sequelize to the database
sequelize.sync().then(() => {
  console.log('Database tables synchronized');
});

// Define API routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Error handling middleware

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});