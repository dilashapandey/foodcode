const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000; 

const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./config/database');
// Connect to MongoDB  
connectDB();

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(morgan('dev'));

//routes
const testRoute = require('./routes/testRoute');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const restaurantRoute = require('./routes/restaurantRoute');
const categoryRoute = require('./routes/categoryRoute');

app.use('/api/test', testRoute);
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/restaurant',restaurantRoute);
app.use('/api/category',categoryRoute);

app.get ('/', (req, res) => { 
    res.send('Hello World!')
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});