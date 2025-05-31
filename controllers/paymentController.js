// const crypto = require('crypto');
// const Razorpay = require('razorpay');
// const Order = require('../models/Order.js');
// const razorpayInstance = require('../config/razorpayConfig.js');

// // Create Razorpay order
// const createPaymentOrder = async (req, res) => {
//   const { amount } = req.body;

//   try {
//     const options = {    
//       amount: amount * 100,
//       currency: 'INR',
//       receipt: `order_rcptid_${Date.now()}`,
//       payment_capture: 1,
//     };

//     const order = await razorpayInstance.orders.create(options);

//     res.json({
//       orderId: order.id,
//       currency: order.currency,
//       amount: order.amount,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Payment order creation failed', error: error.message });
//   }
// };

// // Verify Razorpay payment
// const verifyPayment = async (req, res) => {
//   const { paymentId, orderId, signature } = req.body;

//   const body = orderId + "|" + paymentId;
//   const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//     .update(body)
//     .digest('hex');

//   if (expectedSignature === signature) {
//     try {
//       const order = await Order.findById(orderId);
//       if (order) {
//         order.status = 'Paid';
//         await order.save();
//         res.json({ message: 'Payment verified and order updated' });
//       } else {
//         res.status(404).json({ message: 'Order not found' });
//       }
//     } catch (error) {
//       res.status(500).json({ message: 'Error verifying payment', error: error.message });
//     }
//   } else {
//     res.status(400).json({ message: 'Payment verification failed' });
//   }
// };

// // 👇 Export both functions using CommonJS
// module.exports = {
//   createPaymentOrder,
//   verifyPayment
// };
