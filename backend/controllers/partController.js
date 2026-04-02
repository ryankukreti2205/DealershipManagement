const SparePart = require('../models/SparePart');

// @desc    Get all parts
// @route   GET /api/parts
// @access  Public
const getParts = async (req, res) => {
    try {
        const parts = await SparePart.find({});
        res.json(parts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single part
// @route   GET /api/parts/:id
// @access  Public
const getPartById = async (req, res) => {
    try {
        const part = await SparePart.findById(req.params.id);
        if (part) {
            res.json(part);
        } else {
            res.status(404).json({ message: 'Part not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a part
// @route   POST /api/parts
// @access  Private/Admin
const createPart = async (req, res) => {
    const { name, price, stock, image } = req.body;

    try {
        const part = new SparePart({ name, price, stock, image });
        const createdPart = await part.save();
        res.status(201).json(createdPart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a part
// @route   PUT /api/parts/:id
// @access  Private/Admin
const updatePart = async (req, res) => {
    const { name, price, stock, image } = req.body;

    try {
        const part = await SparePart.findById(req.params.id);

        if (part) {
            part.name = name || part.name;
            part.price = price || part.price;
            part.stock = stock !== undefined ? stock : part.stock;
            part.image = image || part.image;

            const updatedPart = await part.save();
            res.json(updatedPart);
        } else {
            res.status(404).json({ message: 'Part not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a part
// @route   DELETE /api/parts/:id
// @access  Private/Admin
const deletePart = async (req, res) => {
    try {
        const part = await SparePart.findById(req.params.id);

        if (part) {
            await part.deleteOne();
            res.json({ message: 'Part removed' });
        } else {
            res.status(404).json({ message: 'Part not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getParts, getPartById, createPart, updatePart, deletePart };
