const Stripe = require('stripe');
const Payment = require('../models/payment.model');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  try {
    const { amount, userId, bookingId } = req.body;

    // You need to provide a valid product or price ID. 
    // You need to create a Product and a Price through the Stripe Dashboard (https://dashboard.stripe.com/test/products)
    // or via the API. More details: https://stripe.com/docs/api/prices/object
    const priceId = 'your_price_id'; 

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/cancel`,
    });

    const payment = new Payment({
      userId,
      bookingId,
      stripeSessionId: session.id,
      amount: amount, 
      status: 'pending', 
    });

    await payment.save();

    res.status(200).json({
      success: true,
      sessionId: session.id, // You'll need the session ID on the frontend to redirect to checkout
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create checkout session',
    });
  }
};


