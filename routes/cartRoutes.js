const express = require('express');
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
} = require('../controllers/cartController.js');
const { protect } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get("/getCart", protect, getCart)
router.post("/addToCart", protect, addToCart)
router.delete("/clearCart", protect, clearCart);
router.delete("/removeCart/:foodId", protect, removeFromCart);

module.exports = router;
