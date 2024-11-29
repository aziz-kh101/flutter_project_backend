const { default: mongoose } = require("mongoose");

const OrderItem = require('./order_item');
const User = require('./user');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: OrderItem,
    }],
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

orderSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

module.exports = mongoose.model('Order', orderSchema);


