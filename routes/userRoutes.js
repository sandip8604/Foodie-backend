const express = require('express');
const { getProfile, updateProfile, getAllUsers } = require('../controllers/userController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.route('/profile').get(protect, getProfile).put(protect, updateProfile);
router.route('/').get(protect, admin, getAllUsers);


module.exports = router;
