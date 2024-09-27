// backend/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const { bookRide, getBookings } = require('../controllers/bookingController');

// Book a ride
router.post('/book', bookRide);

// Get all bookings for a passenger
router.get('/myBookings/:userId', getBookings);

module.exports = router;
