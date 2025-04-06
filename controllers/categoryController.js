const categoryModel = require('../models/categoryModel');

const createCategory = async (req, res) => {
    const { title, image } = req.body;
    if (!title) {
        return res.status(400).send({ message: 'Title is required' });
    }
    try {
        const category = await categoryModel.create({ 
            title,
            image
        });
        await category.save();
        res.status(201).send({
            message: 'Category created successfully',
            category,
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        if (!categories || categories.length === 0) {
            return res.status(404).send({ message: 'No categories found' });
        }
        res.status(200).send({
            message: 'Categories fetched successfully',
            categories,
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    if (!categoryId) {
        return res.status(400).send({ message: 'Category ID is required' });
    }
    try {
        const category = await categoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }
        res.status(200).send(category);        
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

const updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    if (!categoryId) {
        return res.status(400).send({ message: 'Category ID is required' });
    }
    try {
        const Category = await categoryModel.findByIdAndUpdate(categoryId);
        if (!Category) {
            return res.status(404).send({ message: 'Category not found' });
        }
        const { title, image } = req.body;
        if (title) {
            Category.title = title;
        }
        if (image) {
            Category.image = image;
        }
        await Category.save();
        res.status(200).send({
            message: 'Category updated successfully',
             Category
            });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    if (!categoryId) {
        return res.status(400).send({ message: 'Category ID is required' });
    }
    try {
        const category = await categoryModel.findByIdAndDelete(categoryId);
        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }
        res.status(200).send({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}