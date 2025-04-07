const foodModel = require('../models/foodModel');

const createFood = async (req, res) => {
    try {
        const { title, description, price, category, isAvailable, restaurant, rating, image } = req.body;
        if (!title || !description || !price || !category || !restaurant) {
            return res.status(400).send({ message: 'Please provide all required fields' });
        }
        const food = await foodModel.create({
            title,
            description,
            price,
            category,
            isAvailable,
            restaurant,
            rating,
            image
        });
        if (!food) {
            return res.status(400).send({ message: 'Food creation failed' });
        }
        await food.save();
        res.status(201).send({ message: 'Food created successfully', food });

    }catch (error) {
        console.error(error);
        res.status(500).send({message:error.message});
    }
}

const getAllFood = async (req, res) => {
    try {
        const food = await foodModel.find()
        if (!food) {
            return res.status(404).send({ message: 'No food found' });
        }
        res.status(200).send({ message: 'Food retrieved successfully', food });
    } catch (error) {
        console.error(error);
        res.status(500).send({message:error.message});
        
    }
}

const getFoodById = async (req, res) => {
    const foodId = req.params.id;
    if (!foodId) {
        return res.status(404).send({ message: 'Food Id is required' });
    }
    try{
        const food = await foodModel.findById(foodId)
        if (!food) {
            return res.status(404).send({ message: 'Food not found' });
        }
        res.status(200).send({ message: 'Food retrieved successfully', food });
    }catch (error) {
        console.error(error);
        res.status(500).send({message:error.message});
    }
}

const getFoodByRestaurentId = async (req, res) => {
    const restaurantId = req.params.id;
    if (!restaurantId) {
        return res.status(404).send({ message: 'Restaurant Id is required' });
    }
    try {
        const food = await foodModel.find({ restaurant: restaurantId })
        if (!food) {
            return res.status(404).send({ message: 'No food found for this restaurant' });
        }
        res.status(200).send({ message: 'Food retrieved successfully', food });
    } catch (error) {
        console.error(error);
        res.status(500).send({message:error.message});
    }
}

const updateFood = async (req, res) => {
    const foodId = req.params.id;
    if (!foodId) {
        return res.status(404).send({ message: 'Food Id is required' });
    }
    try {
        const { title, description, price, category, isAvailable, restaurant, rating, image } = req.body;
        const food = await foodModel.findByIdAndUpdate(foodId)
        if (!food) {
            return res.status(404).send({ message: 'Food not found' });
        }
        if (title) {
            food.title = title;
        }
        if (description) {
            food.description = description;
        }
        if (price) {
            food.price = price;
        }
        if (category) {
            food.category = category;
        }
        if (isAvailable) {
            food.isAvailable = isAvailable;
        }
        if (restaurant) {
            food.restaurant = restaurant;
        }
        if (rating) {
            food.rating = rating;
        }
        if (image) {
            food.image = image;
        }
        await food.save();
        if (!food) {
            return res.status(400).send({ message: 'Food update failed' });
        }
        res.status(200).send({ message: 'Food updated successfully', food });
    }catch (error) {
        console.error(error);
        res.status(500).send({message:error.message});
    }
}

const deleteFood = async (req, res) => {
    const foodId = req.params.id;
    if(!foodId) {
        return res.status(404).send({ message: 'Food Id is required' });
    }
    try {
        const food = await foodModel.findByIdAndDelete(foodId)
        if (!food) {
            return res.status(404).send({ message: 'Food not found' });
        }
        res.status(200).send({ message: 'Food deleted successfully', food });
    } catch (error) {
        console.error(error);
        res.status(500).send({message:error.message});        
    }
}

module.exports = {
    createFood, 
    getAllFood,
    getFoodById, 
    getFoodByRestaurentId,
    updateFood, 
    deleteFood
};