const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    answer:{
        type:String,
        required: true,
    },
    role: {
        type: String,
       // required: true,
        enum: ['admin', 'user'],
        default: 'user',
    },
    profilePicture: {
        type: String,
        default: 'https://stock.adobe.com/search/images?k=default+profile+picture',
    },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);