const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    // stripeChargeId: {
    //     type: String,
    //     required: true
    // },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    receipt_url: {
        type: String
    }
});

module.exports = mongoose.model('Payment', PaymentSchema);
