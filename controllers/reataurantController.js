const restaurantModel = require("../models/restaurantModel");
const addRestaurant = async (req, res) => {
    try {
        const {name,imageurl,food,time,pickup,delivery,isopen,logurl,rating,ratingCount,coords} = req.body;
        if (!name || !coords) {
            return res.status(400).send({ message: "Name and address should not be empty" });
        }
        const restaurant = new restaurantModel({
            name,
            imageurl,
            food,
            time,
            pickup,
            delivery,
            isopen,
            logurl,
            rating,
            ratingCount,
            coords
        });
        await restaurant.save();
        res.status(201).send({
            message: "Restaurant created successfully",
            restaurant,
        });
    } catch (error) {
        console.error("Error creating restaurant:", error);
        res.status(500).send({
        message: "Internal server error",
        });
    }
}

const getAllRestaurant = async (req, res) => {
    try {
        const restaurant = await restaurantModel.find({});
        if (!restaurant) {
            return res.status(404).send({ message: "No restaurant found" });
        }
        res.status(200).send({
            message: "Restaurants fetched successfully",
            restaurant,
        });
    } catch (error) {
        console.error("Error fetching all restaurants:", error);
        res.status(500).send({
            message: "Internal server error",
        });        
    }
}

const getRestaurant = async (req, res) => {
    const restaurantId = req.params.id;
    if (!restaurantId) {
        return res.status(400).send({ message: "Restaurant ID is required" });
    }
    try {
        const restaurant = await restaurantModel.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).send({ message: "Restaurant not found" });
        }
        res.status(200).send({
            message: "Restaurant fetched successfully",
            restaurant,
        });   
    } catch (error) {
        console.error("Error fetching restaurant:", error);
        res.status(500).send({
            message: "Internal server error",
        });
    }
}

const updateRestaurant = async (req, res) => {
    const restaurantId = req.params.id;
    if (!restaurantId) {
        return res.status(400).send({ message: "Restaurant ID is required" });
    }
    try {
        const restaurant = await restaurantModel.findByIdAndUpdate(restaurantId);
        if (!restaurant) {
            return res.status(404).send({ message: "Restaurant not found" });
        }
        const {name,imageurl,food,time,pickup,delivery,isopen,logurl,rating,ratingCount,coords} = req.body;
        if (name) restaurant.name = name;  
        if (imageurl) restaurant.imageurl = imageurl;
        if (food) restaurant.food = food;
        if (time) restaurant.time = time;
        if (pickup) restaurant.pickup = pickup;
        if (delivery) restaurant.delivery = delivery;
        if (isopen) restaurant.isopen = isopen;
        if (logurl) restaurant.logurl = logurl;
        if (rating) restaurant.rating = rating;
        if (ratingCount) restaurant.ratingCount = ratingCount;
        if (coords) restaurant.coords = coords;
        await restaurant.save();
        res.status(200).send({
            message: "Restaurant updated successfully",
            restaurant,
        });
    } catch (error) {
        console.error("Error updating restaurant:", error);
        res.status(500).send({
            message: "Internal server error",
        });
    }
}

const deleteRestaurant =async (req, res) => {
    const restaurantId = req.params.id;
    if(!restaurantId){
        return res.status(400).send({ message: "Restaurant ID is required" });
    }
    try {
        const restaurant = await restaurantModel.findByIdAndDelete(restaurantId);
        if (!restaurant) {
            return res.status(404).send({ message: "Restaurant not found" });
        }
        res.status(200).send({
            message: "Restaurant deleted successfully",
            restaurant,
        });
    } catch (error) {
        console.error("Error deleting restaurant:", error);
        res.status(500).send({
            message: "Internal server error",
        });
        
    }
}

module.exports = { addRestaurant ,getAllRestaurant, getRestaurant, updateRestaurant, deleteRestaurant };
