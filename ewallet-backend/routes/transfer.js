// backend/routes/transfer.js
const express = require('express');
const authenticate = require('../middleware/authenticate');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const router = express.Router();

router.post('/transfer', authenticate, async (req, res) => {
  const { recipientUsername, amount } = req.body;
  const senderId = req.user.userId;

  try {
    const sender = await User.findById(senderId);
    if (sender.balance < amount) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }

    const recipient = await User.findOne({ username: recipientUsername });
    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    sender.balance -= amount;
    recipient.balance += amount;

    await sender.save();
    await recipient.save();

    const senderTransaction = new Transaction({
      userId: senderId,
      amount,
      type: 'transfer',
    });
    await senderTransaction.save();

    const recipientTransaction = new Transaction({
      userId: recipient._id,
      amount,
      type: 'receive',
    });
    await recipientTransaction.save();

    res.json({ message: 'Transfer successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
