const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require("../utils/generateToken");

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;
        console.log(req.body);
        //Validate input
        if (!name || !email || !password || !phone || !address || !answer) {
            return res.status(400).send({ message: 'All fields are required' });
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }

        if (!strongPasswordRegex.test(password)) {
            return res.status(400).send({
              message:
                'Password must include at least 8 characters, uppercase, lowercase, number, and special character.',
            });
          }
      
        const hash = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            name,
            email,
            password: hash,
            phone,
            address,
            answer
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

const adminregister = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;
        if (!name || !email || !password || !phone || !address || !answer) {
            return res.status(400).send({ message: 'All fields are required' });
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }
        if (!strongPasswordRegex.test(password)) {
            return res.status(400).send({
              message:
                'Password must include at least 8 characters, uppercase, lowercase, number, and special character.',
            });
          }
      
        const hash = await bcrypt.hash(password, 10);
        const admin = await userModel.create({
            name,
            email,
            password: hash,
            phone,
            address,
            answer,
            role: 'admin'
        });
        await admin.save();
        const token = generateToken(admin);
        res.cookie('token', token);
        res.status(201).send({
            admin,token,
            message: 'Admin created successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
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
                answer : user.answer,
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

module.exports = { registerUser,adminregister, login, logout};