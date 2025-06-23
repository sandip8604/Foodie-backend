const Order = require('../models/Order.js');
const Cart = require('../models/Cart.js');
const Food = require('../models/Food.js');

// Place order
exports.placeOrder = async (req, res) => {
  const { restaurant, paymentMethod } = req.body;

  if (!restaurant || !paymentMethod) {
    return res.status(400).json({ message: 'Missing restaurant or payment method' });
  }

  try {

    const cart = await Cart.findOne({ user: req.user._id }).populate('items.food');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const total = cart.items.reduce((acc, item) => acc + item.food.price * item.quantity, 0);

    const newOrder = await Order.create({
      user: req.user._id,
      restaurant,
      items: cart.items.map(i => ({
        food: i.food._id,
        quantity: i.quantity
      })),
      totalPrice: total,
      paymentMethod
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({ message: "Order placed", order: newOrder });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ message: 'Failed to place order' });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.food restaurant');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.food restaurant user');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order' });
  }
};

// Admin: get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user restaurant items.food');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// Admin: update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = req.body.status || order.status;
    await order.save();

    res.json({ message: 'Status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status' });
  }
};
