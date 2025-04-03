const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const {getuser ,updateuser,updatepasswordans,updatepassword,deleteuser} = require('../controllers/userController');
const isLoggedIn = require('../middleware/isloggedin');


router.get('/getuser',isLoggedIn, getuser);

router.put('/updateuser',isLoggedIn, updateuser);

router.post('/updatepasswordans',isLoggedIn,updatepasswordans)

router.post('/updatepassword',isLoggedIn,updatepassword)

router.delete('/deleteuser:id',isLoggedIn, deleteuser);

module.exports = router;