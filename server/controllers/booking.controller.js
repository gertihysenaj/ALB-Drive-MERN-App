const Booking = require('../models/booking.model');
const Payment = require('../models/payment.model');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });

/// Create a new booking and initiate a payment
exports.createBooking = async (req, res) => {
    console.log('Request body:', req.body);

    try {
        const { userId, carId, startDate, endDate, totalPrice, pickUp, dropOff, carDetails } = req.body;
        const { name, images, description } = carDetails;

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

        // Create Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: booking.totalPrice * 100,
                        product_data: {
                            name: carDetails.name, 
                            images: carDetails.images.map(image => `http://localhost:8000/${image}`), 
                            description: carDetails.description, 
                        },
                        
                    },
                    
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3000/cancel`,
            
        });

    


        // Create new payment record
        const payment = new Payment({
            userId,
            bookingId: booking._id,
            stripeSessionId: session.id,
            amount: booking.totalPrice,
            status: 'pending',
        });

        await payment.save();

        console.log('Payment record created');

        res.status(201).json({
            success: true,
            booking: booking,
            sessionId: session.id,  
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

