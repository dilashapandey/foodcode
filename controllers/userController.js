const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { generateToken } = require("../utils/generateToken");

const getuser = async (req, res) => {
   try {
     const user = await userModel.findById(req.user.id).select("-password");
     if (!user) {
       return res.status(404).send("User not found");
     }
        res.status(200).send(user);
   } catch (error) {
    console.log(error);
     res.status(500).send({
         message: "Internal server error",
     });    
   }
}

const updateuser = async(req,res) => {
    try{
        const user = await userModel.findByIdAndUpdate(req.user.id)
        if(!user){
            return res.status(404).send("User not found");
        }
        const {name,phone,address,} = req.body;
        if(name){
            user.name = name;
        }
        if(phone){
            user.phone = phone;
        }
        if(address){
            user.address = address;
        }
        await user.save();
        res.status(200).send({user,message:"User updated successfully"});
    }catch(error){
        console.log(error);
        res.status(500).send({
            message: "Internal server error",
        });
    }
}

const deleteuser = async (req, res) => {}

module.exports = {getuser, updateuser, deleteuser};