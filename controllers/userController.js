const User = require('../models/User.js');

// Get profile of the logged-in user
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile' });
    }
};

// Update profile of the logged-in user
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.userName = req.body.userName || user.userName;
        user.email = req.body.email || user.email;
        user.address = req.body.address || user.address;
        user.phone = req.body.phone || user.phone;
        user.usertype = req.body.usertype || user.usertype;
        user.profile = req.body.profile || user.profile;
        user.answer = req.body.answer || user.answer;

        if (req.body.password) {
            user.password = req.body.password; // You should hash it before saving
        }

        const updated = await user.save();

        res.json({
            _id: updated._id,
            userName: updated.userName,
            email: updated.email,
            phone: updated.phone,
            address: updated.address,
            usertype: updated.usertype,
            profile: updated.profile,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile' });
    }
};

// Get all users (Admin-only)
const getAllUsers = async (req, res) => {
    try {
        if (req.user.usertype !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

// 👇 Export all functions using CommonJS
module.exports = {
    getProfile,
    updateProfile,
    getAllUsers,
};