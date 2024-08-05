// backend/routes/funds.js
const express = require('express');
const authenticate = require('../middleware/authenticate');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const router = express.Router();

router.post('/add', authenticate, async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);
    user.balance += amount;
    await user.save();

    const transaction = new Transaction({
      userId,
      amount,
      type: 'add',
    });
    await transaction.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
