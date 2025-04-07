const express = require('express');
const router = express.Router();

const orderModel = require('../models/orderModel');
const isLoggedIn = require('../middleware/isloggedin');
const { addOrder, setOrderStatus, getAllOrders, getOrderById, updateOrder, deleteOrder } = require('../controllers/orderController');
const isAdmin = require('../middleware/isadmin');

router.get('/', async (req, res) => {
    res.send('Order route is working!');
})

router.post('/add', isLoggedIn, addOrder);

router.post('/status/:id',isLoggedIn, isAdmin, setOrderStatus);

router.get('/all', isLoggedIn, getAllOrders);

router.get('/:id', isLoggedIn, getOrderById);

router.put('/:id', isLoggedIn, updateOrder);

router.delete('/:id', isLoggedIn, deleteOrder);

module.exports = router;