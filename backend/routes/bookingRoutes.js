const express = require('express');
const router = express.Router();
const { createBooking, getBookings } = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/authMiddleware');

// Bookings can be made publicly, but we can also extract user if token passed (handled in optional manner). For simplicity, we just won't enforce `protect` on POST.
router.route('/').post(createBooking).get(protect, admin, getBookings);

module.exports = router;
