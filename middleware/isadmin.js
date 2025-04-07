const userModel = require('../models/userModel');
const isAdmin = async(req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(401).send({ message: 'User not found' });
        }
        if (user.role !== 'admin') {
            return res.status(403).send({ message: 'Access denied, admin only' });
        }
        next();

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}

module.exports = isAdmin;