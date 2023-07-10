const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    pickUp: {
        type: String, // Adjust the data type according to your needs
        required: true
    },
    dropOff: {
        type: String, // Adjust the data type according to your needs
        required: true
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

BookingSchema.virtual('car', {
    ref: 'Car',
    localField: 'carId',
    foreignField: '_id',
    justOne: true
});

module.exports = mongoose.model('Booking', BookingSchema);
