const express = require('express');
const {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant
} = require('../controllers/restaurantController.js');

const { protect, admin, vendor,checkRole } = require('../middleware/authMiddleware.js');

const router = express.Router();

console.log("CreateRestaurant:", createRestaurant);

router.get("/getAll", getRestaurants)
router.post("/create", protect,checkRole("admin","vendor") , createRestaurant);
router.get("/getRestaurantById/:id", getRestaurantById)
router.put("/update/:id", protect,checkRole("admin","vendor") , updateRestaurant)
router.delete("/delete", protect, checkRole("admin","vendor") , deleteRestaurant);

module.exports = router;