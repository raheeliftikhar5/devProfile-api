const express = require('express');

const router = express.Router();

// @route   GET /api/users/test
// @desc    Test user route
// @access  Public
router.get('/test', (req, res) => res.json('Test user is working'));

// @route   POST /api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', (req, res) => res.send('Test user is working'));

// @route   POST /api/users/login
// @desc    Login user and return JWT token
// @access  Public
router.post('/login', (req, res) => res.send('Test user is working'));

// @route   GET /api/users/current
// @desc    Get current login user
// @access  Private
router.get('/current', (req, res) => res.send('Test user is working'));

module.exports = router;