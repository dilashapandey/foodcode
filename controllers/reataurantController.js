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
module.exports = { addRestaurant };
