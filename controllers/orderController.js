const orderModel = require('../models/orderModel');

const addOrder = async (req, res) => {
    try {
        const {cart} = req.body;
        if (!cart ) {
            return res.status(400).send({ message: 'All fields are required' });
        }
        let total=0;
        cart.forEach((item) => {
            total += item.price;
        });
        const order = await orderModel.create({
            food: cart,
            payment: total,
            buyer: req.user.id,
        });
        if (!order) {
            return res.status(400).send({ message: 'Order not created' });
        }
        //await order.save();
        res.status(201).send({ message: 'Order created successfully', order });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).sort({ createdAt: -1 });
        if (!orders) {
            return res.status(400).send({ message: 'No orders found' });
        }
        res.status(200).send({ message: 'Orders fetched successfully', orders });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}
const getOrderById = async (req, res) => {
    const orderId = req.params.id;
    if (!orderId) {
        return res.status(400).send({ message: 'Order ID is required' });
    }
    try {
        const order = await orderModel.findById(orderId).populate('food').populate('buyer');
        if (!order) {
            return res.status(400).send({ message: 'Order not found' });
        }
        res.status(200).send({ message: 'Order fetched successfully', order });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}

const updateOrder = async (req, res) => {
    const orderId = req.params.id;
    if (!orderId) {
        return res.status(400).send({ message: 'Order ID is required' });
    }
    try {
        const order = await orderModel.findByIdAndUpdate(orderId);
        if (!order) {
            return res.status(400).send({ message: 'Order not found' });
        }
        const { status } = req.body;
        if (status) {
            order.status = status;
        }
        res.status(200).send({ message: 'Order updated successfully', order });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}

const deleteOrder = async (req, res) => {
    const orderId = req.params.id;
    if (!orderId) {
        return res.status(400).send({ message: 'Order ID is required' });
    }
    try {
        const order = await orderModel.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(400).send({ message: 'Order not found' });
        }
        res.status(200).send({ message: 'Order deleted successfully', order });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}

const setOrderStatus = async (req, res) => {
    const orderId = req.params.id;
    if (!orderId) {
        return res.status(400).send({ message: 'Order ID is required' });
    }
    try {
        const order = await orderModel.findByIdAndUpdate(orderId);
        if (!order) {
            return res.status(400).send({ message: 'Order not found' });
        }
        const { status } = req.body;
        if (status) {
            order.status = status;
        }
        res.status(200).send({ message: 'Order status updated successfully', order });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}

module.exports = {
    addOrder,
    setOrderStatus,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
}
