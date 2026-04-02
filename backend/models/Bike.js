const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    specs: {
        engine: { type: String, required: true },
        power: { type: String, required: true },
        torque: { type: String, required: true },
        weight: { type: String, required: true },
    },
}, { timestamps: true });

module.exports = mongoose.model('Bike', bikeSchema);
