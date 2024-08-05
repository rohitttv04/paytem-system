// backend/routes/transactions.js
const express = require('express');
const authenticate = require('../middleware/authenticate');
const Transaction = require('../models/Transaction');
const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  const userId = req.user.userId;

  try {
    const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
