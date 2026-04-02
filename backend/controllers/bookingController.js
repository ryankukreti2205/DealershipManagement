const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public (or Private depending on requirements, let's make it Public as per generic spec, or assume user logged in)
const createBooking = async (req, res) => {
    const { bike, name, email, phone, date } = req.body;

    if (!bike || !name || !email || !phone || !date) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const booking = new Booking({
            user: req.user ? req.user._id : null,
            bike,
            name,
            email,
            phone,
            date,
        });

        const createdBooking = await booking.save();
        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('bike', 'name price');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createBooking, getBookings };
