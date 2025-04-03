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

const updatepasswordans =async(req,res)=>{
    try{
        const{ email, newpassword, answer } = req.body;
        if (!email || !newpassword || !answer) {
            return res.status(400).send("Please fill all the fields");
        }
        const user = await userModel.findOne({ email, answer });
        if (!user) {
            return res.status(404).send("User not found");
        }
        const hash = await bcrypt.hash(newpassword,10);
        user.password = hash;
        await user.save();
        res.status(200).send("Password updated successfully");
    }catch(error){
        console.log(error);
        res.status(500).send({
            message: "Internal server error",
        });
    }
}

const updatepassword = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        const { oldpassword, newpassword } = req.body;
        if (!oldpassword || !newpassword) {
            return res.status(400).send("Please fill all the fields");
        }
        const isMatch = await bcrypt.compare(oldpassword, user.password);
        if (!isMatch) {
            return res.status(400).send("Old password is incorrect");
        }
        user.password = await bcrypt.hash(newpassword, 10);
        await user.save();
        res.status(200).send("Password updated successfully");
    }catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal server error",
        });
    }
}

const deleteuser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.user.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send("User deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal server error",
        });
    }
}

module.exports = {getuser, updateuser, updatepasswordans, updatepassword, deleteuser};