const mongoose = require('mongoose');

const sparePartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    image: {
        type: String,
        required: false,
    }
}, { timestamps: true });

module.exports = mongoose.model('SparePart', sparePartSchema);
