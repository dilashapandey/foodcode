const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const isLoggedIn = require('../middleware/isloggedin');

const { registerUser,adminregister, login, logout } = require('../controllers/authController');

router.post('/register', registerUser);

router.post('/register/admin', adminregister);

router.post('/login', login);

router.post('/logout', isLoggedIn, logout);

module.exports = router;
