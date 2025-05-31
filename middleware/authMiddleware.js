const User = require('../models/User.js');
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.usertype === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};

const vendor = (req, res, next) => {
    if (req.user && req.user.usertype === 'vendor') {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied. vendor only.' });
    }
};

const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.usertype)) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    };
  };

module.exports = {
    protect,
    admin,
    vendor,
    checkRole
};
