const Cart = require('../models/Cart.js');
const Food = require('../models/Food.js');

// Get user cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.food');
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
};

// Add to cart
exports.addToCart = async (req, res) => {
  const { foodId, quantity } = req.body;

  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const parsedQty = parseInt(quantity, 10);
  if (!foodId || isNaN(parsedQty) || parsedQty < 1) {
    return res.status(400).json({ message: "Invalid foodId or quantity" });
  }

  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.food.toString() === foodId);

    if (itemIndex > -1) {

      cart.items[itemIndex].quantity = parsedQty;
    } else {
      cart.items.push({ food: foodId, quantity: parsedQty });
    }

    await cart.save();
    const populatedCart = await cart.populate('items.food');
    res.status(201).json(populatedCart);

  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: 'Failed to add to cart' });
  }
};



// Remove =require(cart
exports.removeFromCart = async (req, res) => {
  const { foodId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.food.toString() !== foodId);
    await cart.save();

    res.json({ message: 'Item removed', cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove item' });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear cart' });
  }
};
