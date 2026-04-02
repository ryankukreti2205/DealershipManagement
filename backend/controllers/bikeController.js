const Bike = require('../models/Bike');

// @desc    Get all bikes
// @route   GET /api/bikes
// @access  Public
const getBikes = async (req, res) => {
    try {
        const bikes = await Bike.find({});
        res.json(bikes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single bike
// @route   GET /api/bikes/:id
// @access  Public
const getBikeById = async (req, res) => {
    try {
        const bike = await Bike.findById(req.params.id);
        if (bike) {
            res.json(bike);
        } else {
            res.status(404).json({ message: 'Bike not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a bike
// @route   POST /api/bikes
// @access  Private/Admin
const createBike = async (req, res) => {
    const { name, price, image, specs } = req.body;

    try {
        const bike = new Bike({ name, price, image, specs });
        const createdBike = await bike.save();
        res.status(201).json(createdBike);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a bike
// @route   PUT /api/bikes/:id
// @access  Private/Admin
const updateBike = async (req, res) => {
    const { name, price, image, specs } = req.body;

    try {
        const bike = await Bike.findById(req.params.id);

        if (bike) {
            bike.name = name || bike.name;
            bike.price = price || bike.price;
            bike.image = image || bike.image;
            bike.specs = specs || bike.specs;

            const updatedBike = await bike.save();
            res.json(updatedBike);
        } else {
            res.status(404).json({ message: 'Bike not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a bike
// @route   DELETE /api/bikes/:id
// @access  Private/Admin
const deleteBike = async (req, res) => {
    try {
        const bike = await Bike.findById(req.params.id);

        if (bike) {
            await bike.deleteOne();
            res.json({ message: 'Bike removed' });
        } else {
            res.status(404).json({ message: 'Bike not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getBikes, getBikeById, createBike, updateBike, deleteBike };
