const express = require('express');
const jwt = require('jsonwebtoken');
const InventoryItem = require('../models/InventoryItem');
const User = require('../models/User');

const router = express.Router();

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(403).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Add Item
router.post('/', auth, async (req, res) => {
  try {
    const { name, quantity, price, description } = req.body;
    const item = new InventoryItem({ name, quantity, price, description, addedBy: req.user.id });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Items
router.get('/', auth, async (req, res) => {
  try {
    const items = await InventoryItem.find().populate('addedBy', 'username');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Item
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, price, description } = req.body;
    const item = await InventoryItem.findByIdAndUpdate(id, { name, quantity, price, description }, { new: true });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Item
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    await InventoryItem.findByIdAndDelete(id);
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
