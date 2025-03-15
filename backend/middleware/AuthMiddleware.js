const jwt = require('jsonwebtoken');

const AuthMiddleware = (req, res, next) => { 
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: "Access Denied: No token provided." });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
}

module.exports = AuthMiddleware;