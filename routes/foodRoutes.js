const express = require('express');
const {
  createFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood,
  getFoodByRestaurant
} = require('../controllers/foodController.js');
const { protect, checkRole } = require('../middleware/authMiddleware.js');

const router = express.Router();


router.get("/getAll", getFoods)
router.post("/create", protect, checkRole("admin", "vendor"), createFood);
router.get("/getFoodByRestaurant/:id", getFoodByRestaurant);
router.get("/get/:id", getFoodById)
router.put("/update/:id", protect, checkRole("admin", "vendor"), updateFood)
router.delete("/delete/:id", protect, checkRole("admin", "vendor"), deleteFood);

module.exports = router;
