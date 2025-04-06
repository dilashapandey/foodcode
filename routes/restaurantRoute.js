const express = require('express');
const router = express.Router();
const { getAllRestaurant, getRestaurant, addRestaurant, updateRestaurant, deleteRestaurant } = require('../controllers/reataurantController');
const isLoggedIn = require('../middleware/isloggedin'); 

// Route to get all restaurants
router.post('/create', isLoggedIn, addRestaurant);
router.get('/all', getAllRestaurant);
router.get('/:id', getRestaurant);
router.put('/:id', isLoggedIn, updateRestaurant);
router.delete('/:id', isLoggedIn, deleteRestaurant);

module.exports = router; 