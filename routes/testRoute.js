const express = require('express');
const router = express.Router();
const { testController } = require('../controllers/testController');

// Define a test route
router.get('/', testController);

module.exports = router;