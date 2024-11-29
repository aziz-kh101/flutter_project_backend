const mongoose = require('mongoose');
const Food = require('./food');

const OrderItem = new mongoose.Schema({
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Food,
    },
    spicy: Number,
    quantity: Number,
});

OrderItem.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

module.exports = mongoose.model('OrderItem', OrderItem);