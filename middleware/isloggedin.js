const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    // Get token from headers
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const secretKey = process.env.SECRET_KEY; 
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid or expired token." });
            }
            else{
                req.user = decoded;
                next(); 
            }
        });        
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};

module.exports = isLoggedIn;
