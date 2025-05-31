const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  image: { type: String },
  category: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true }
}, { timestamps: true });

module.exports = new mongoose.model('Restaurant', restaurantSchema);

