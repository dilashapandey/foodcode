const restaurantModel = require('../models/restaurantModel');
const express = require('express');
const router = express.Router();
const { getRestaurants, addRestaurant, updateRestaurant, deleteRestaurant } = require('../controllers/reataurantController');
const isLoggedIn = require('../middleware/isloggedin'); 

// Route to get all restaurants
router.post('/create', isLoggedIn, addRestaurant);


module.exports = router;