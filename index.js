const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000; 
const dotenv = require('dotenv');

const cors = require('cors');
const morgan = require('morgan');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(morgan('dev'));
const connectDB = require('./config/database');
// Connect to MongoDB  
connectDB();

//routes
const testRoute = require('./routes/testRoute');
app.use('/api/test', testRoute);

app.get ('/', (req, res) => { 
    res.send('Hello World!')
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});