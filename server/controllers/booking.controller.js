const Booking = require('../models/booking.model');
const Payment = require('../models/payment.model');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });

// Create a new booking and initiate a payment
exports.createBooking = async (req, res) => {
    console.log('Request body:', req.body);

    try {
        const { userId, carId, startDate, endDate, totalPrice, pickUp, dropOff } = req.body;
        const booking = new Booking({
            userId,
            carId,
            startDate,
            endDate,
            totalPrice,
            pickUp,
            dropOff
        });

        console.log('Booking object:', booking);

        await booking.save();
        console.log('Booking saved');

        const paymentIntent = await stripe.paymentIntents.create({
            amount: booking.totalPrice * 100, // convert to cents
            currency: 'usd',
            metadata: { integration_check: 'accept_a_payment', bookingId: booking._id.toString() },
        });
        console.log('Payment intent created');

        res.status(201).json({
            success: true,
            booking: booking,
            client_secret: paymentIntent.client_secret
        });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

exports.getAllBookings = async (req, res) => {
    // Fetch all bookings from database and send them in response
    const bookings = await Booking.find({});
    res.json(bookings);
};

// Get all bookings for a user
exports.getBookingsByUserId = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.userId }).populate('car');
        res.status(200).json({
            success: true,
            data: bookings
        });
    } catch (err) {
        console.log(err);

        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

// Delete a booking by id
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

