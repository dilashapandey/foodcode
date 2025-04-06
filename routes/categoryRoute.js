const express = require('express');
const router = express.Router();

const { 
    getAllCategories, 
    createCategory, 
    getCategoryById, 
    updateCategory, 
    deleteCategory } = require('../controllers/categoryController');
const isLoggedIn = require('../middleware/isloggedin');

router.get('/', (req, res) => {
    res.send('Category route is working');
});

router.post('/create',isLoggedIn, createCategory);

router.get('/all', getAllCategories);

router.get('/:id', getCategoryById);

router.put('/:id',isLoggedIn, updateCategory);

router.delete('/:id',isLoggedIn, deleteCategory);

module.exports = router;