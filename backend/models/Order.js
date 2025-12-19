const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [
        {
            productId: { type: Number, required: true }, // Using Number to match frontend mock IDs for now
            name: { type: String, required: true },
            price: { type: Number, required: true },
            qty: { type: Number, required: true }
        }
    ],
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentMethod: { type: String, default: 'Cash' },
    status: { type: String, default: 'Completed' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
