const Stripe = require('stripe');
const Payment = require('../models/payment.model');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Replace with your Stripe secret key

// Process a payment
exports.processPayment = async (req, res) => {
  try {
    const { token, amount, userId, bookingId } = req.body;

    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        token,
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: paymentMethod.id,
      confirm: true,
    });

    const payment = new Payment({
      userId,
      bookingId,
      stripeChargeId: paymentIntent.id,
      amount: paymentIntent.amount,
      status: paymentIntent.status,
      receipt_url: paymentIntent.charges.data[0].receipt_url,
    });

    await payment.save();

    res.status(200).json({
      success: true,
      data: paymentIntent,
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process payment',
    });
  }
};

