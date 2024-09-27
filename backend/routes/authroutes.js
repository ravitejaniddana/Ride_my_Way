// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { login, signup, switchRole } = require('../controllers/authController');

// User Signup
router.post('/signup', signup);

// User Login
router.post('/login', login);

// Switch Role
router.put('/switchRole/:userId', switchRole);

module.exports = router;
