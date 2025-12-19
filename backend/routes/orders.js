const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create a new order
router.post('/', async (req, res) => {
    const { items, subtotal, tax, total } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'No items in order' });
    }

    try {
        const newOrder = new Order({
            items,
            subtotal,
            tax,
            total
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get recent orders (optional for dashboard)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 }).limit(10);
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
