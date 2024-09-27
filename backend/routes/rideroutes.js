// backend/routes/rideRoutes.js
const express = require('express');
const router = express.Router();
const { createRide, getAvailableRides } = require('../controllers/rideController');

// Create a new ride (Driver only)
router.post('/create', createRide);

// Get available rides (Passenger)
router.get('/available', getAvailableRides);

module.exports = router;
