const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require("../utils/generateToken");

const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        console.log(req.body);
        //Validate input
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).send({ message: 'All fields are required' });
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }
        const hash = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            name,
            email,
            password: hash,
            phone,
            address
        });

        await user.save();

        const token = generateToken(user);
        res.cookie('token', token);
        console.log(user);
        res.status(201).send({
            user,token,
            message: 'User created successfully'
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            return res.status(400).send({ message: 'All fields are required' });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }
        const token = generateToken(user);
        res.cookie('token', token);
        res.status(200).send({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
                profilePicture: user.profilePicture
            },token,
            message: 'Login successful'
        });
    }   catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};  

const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).send({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, login, logout};