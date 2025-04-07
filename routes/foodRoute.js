const express = require('express');
const router = express.Router();
const { 
    getAllFood, 
    createFood, 
    getFoodById, 
    getFoodByRestaurentId,
    updateFood, 
    deleteFood } = require('../controllers/foodController');

const isLoggedIn = require('../middleware/isloggedin');

router.get('/', (req, res) => {
    res.send('Food route is working');
});

router.post('/create',isLoggedIn, createFood);

router.get('/all', getAllFood);

router.get('/:id', getFoodById);

router.get('/restaurant/:id', getFoodByRestaurentId);

router.put('/:id',isLoggedIn, updateFood);

router.delete('/:id',isLoggedIn, deleteFood);

module.exports =router;