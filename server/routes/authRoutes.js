const express = require('express');
const { register, login, updatePreferences } = require('../controllers/authController');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

//Save preferences route
router.post('/preferences', updatePreferences);

module.exports = router;
