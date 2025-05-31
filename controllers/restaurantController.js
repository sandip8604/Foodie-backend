const Restaurant = require('../models/Restaurant.js');

const createRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.create(req.body);
        res.status(201).json(restaurant);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create restaurant' });
    }
};

const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();

        res.json(restaurants);
        console.log("get rest.. susccess");
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch restaurants' });
    }
};

const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ message: 'Not found' });
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch restaurant' });
    }
};

const updateRestaurant = async (req, res) => {
    try {
        const updated = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Update failed' });
    }
};

const deleteRestaurant = async (req, res) => {
    try {
        await Restaurant.findByIdAndDelete(req.params.id);
        res.json({ message: 'Restaurant deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Delete failed' });
    }
};

// 👇 Export all handlers as a single object
module.exports = {
    createRestaurant,
    getRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
};
