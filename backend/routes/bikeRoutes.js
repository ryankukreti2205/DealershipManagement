const express = require('express');
const router = express.Router();
const { getBikes, getBikeById, createBike, updateBike, deleteBike } = require('../controllers/bikeController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getBikes).post(protect, admin, createBike);
router.route('/:id').get(getBikeById).put(protect, admin, updateBike).delete(protect, admin, deleteBike);

module.exports = router;
