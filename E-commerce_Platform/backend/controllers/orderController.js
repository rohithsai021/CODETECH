const Order = require('../models/Order');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createOrder = async (req, res) => {
  const { products, totalPrice, stripeToken } = req.body;
  try {
    const payment = await stripe.charges.create({
      amount: totalPrice * 100,
      currency: 'usd',
      source: stripeToken,
    });

    const order = new Order({
      user: req.user.id,
      products,
      totalPrice,
      paymentStatus: payment.status,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: 'Order creation failed' });
  }
};
