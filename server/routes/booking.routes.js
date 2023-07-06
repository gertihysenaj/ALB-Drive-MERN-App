
const bookingController = require('../controllers/booking.controller');


module.exports = app => {
app.post('/api/bookings', bookingController.createBooking);
app.get('/api/bookings/:userId', bookingController.getBookingsByUserId);
app.delete('/api/bookings/:id', bookingController.deleteBooking);

};
