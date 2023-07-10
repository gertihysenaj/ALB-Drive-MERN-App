import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/bookings');
                const bookingsData = response.data;

                // Fetch user details for each booking
                const updatedBookings = await Promise.all(
                    bookingsData.map(async (booking) => {
                        const userResponse = await axios.get(`http://localhost:8000/api/users/${booking.userId}`);
                        const userData = userResponse.data;

                        const carResponse = await axios.get(`http://localhost:8000/api/cars/${booking.carId}`);
                        const carData = carResponse.data.data;
                        


                        console.log('Car data for booking', booking._id, carData); // Log car data

                        // Combine booking and user data
                        return {
                            ...booking,
                            user: userData,
                            car: carData,
                        };
                    })
                );

                setBookings(updatedBookings);
            } catch (error) {
                console.error('Error fetching bookings', error);
            }
        };

        fetchBookings();
    }, []);
    console.log(bookings);

    return (
        <div>
            <h1 className="mb-4 booking-title">Admin - All Bookings</h1>
            {bookings.map((booking) => (
                <div key={booking._id} className="card custom-card mb-3">
                    <div className="card-body">
                        <div className="left-section">
                            <h3 className="card-title">Booked by: {booking.user.firstName} {booking.user.lastName}</h3>
                            <img className="booking-image" src={`http://localhost:8000/${booking.car && booking.car.img ? booking.car.img.replace('\\', '/') : ''}`} alt={booking.car ? booking.car.model : ''} />
                            <h2 className="card-subtitle">Booked Car: {booking.car ? booking.car.mark : ''} {booking.car ? booking.car.model : ''}</h2>
                        </div>
                        <div className="right-section">
                            <p className="card-text">Pick-up: {booking.pickUp}</p>
                            <p className="card-text">Drop-off: {booking.dropOff}</p>
                            <p className="card-text">Email: {booking.user.email}</p>
                            <p className="card-text">Price: ${booking.totalPrice}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminBookings;
