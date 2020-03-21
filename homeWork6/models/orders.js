const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    pasta: {
        type: String,
        required: false,
        default : 'Rigatoni',
    },
    pizza: {
        type: String,
        required: false,
        default : 'Margarita',
    },
    dessert: {
        type: String,
        required: false,
        default : 'Tiramisu',
    },
    drink: {
        type: String,
        required: false,
        default : 'Water',
    },
});

const Order = mongoose.model('orders', OrderSchema);
module.exports = Order;