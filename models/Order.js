const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    consumerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    items: [{
        name: String,
        quantity: Number,
        price: Number
    }],
    totalAmount: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['PENDING', 'ACCEPTED', 'PREPARING', 'IN_TRANSIT', 'DELIVERED'], 
        default: 'PENDING' 
    },
    isReviewed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);