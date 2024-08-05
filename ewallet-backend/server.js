// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const fundsRoutes = require('./routes/funds');
const transferRoutes = require('./routes/transfer');
const transactionRoutes = require('./routes/transactions');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.use('/api/auth', authRoutes);
app.use('/api/funds', fundsRoutes);
app.use('/api/transfer', transferRoutes);
app.use('/api/transactions', transactionRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
