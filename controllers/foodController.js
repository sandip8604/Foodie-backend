const Food = require('../models/Food.js');
const mongoose = require("mongoose");

exports.createFood = async (req, res) => {
    try {
        const food = await Food.create(req.body);
        res.status(201).json(food);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create food' });
    }
};

exports.getFoods = async (req, res) => {
    try {
        const foods = await Food.find().populate('restaurant');
        console.log(foods);

        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch foods' });
    }
};

exports.getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id).populate('restaurant');
        console.log(food);
        if (!food) return res.status(404).json({ message: 'Not found' });

        res.json(food);
    } catch (error) {
        res.status(500).json({ message: 'Fetch failed' });
    }
};
exports.getFoodByRestaurant = async (req, res) => {
    try {
        console.log("getfoodbyrest.is::" + req.params.id);

        const restaurantObjectId = new mongoose.Types.ObjectId(req.params.id);

        console.log("restaurantObjid" + restaurantObjectId);

        const food = await Food.find({ restaurant: restaurantObjectId }).populate('restaurant');

        console.log("food::" + food);
        if (!food) return res.status(404).json({ message: 'Not found' });

        res.json(food);
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Fetch failed' });
    }
};

exports.updateFood = async (req, res) => {
    try {
        const updated = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Update failed' });
    }
};

exports.deleteFood = async (req, res) => {
    try {
        await Food.findByIdAndDelete(req.params.id);
        res.json({ message: 'Food deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Delete failed' });
    }
};
