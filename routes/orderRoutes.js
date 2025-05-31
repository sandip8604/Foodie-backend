const express = require('express');
const {
  placeOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/orderController.js');
const { protect, checkRole } = require('../middleware/authMiddleware.js');

const router = express.Router();


router.post("/placeOrder", protect, placeOrder)
router.get("/getUserOrder", protect, getUserOrders);

router.get("/getAll", protect, checkRole('admin'), getAllOrders);


router.get("/:id", protect, getOrderById)
router.put("/orderStatus/:id", protect, checkRole('admin'), updateOrderStatus);

module.exports = router;
