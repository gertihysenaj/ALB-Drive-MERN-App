import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserBookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
        console.log('Fetching bookings for user', user.id); 

      try {
        const response = await axios.get(`http://localhost:8000/api/bookings/${user.id}`);
        console.log(response.data); 

        const updatedBookings = response.data.data.map((booking) => {
            console.log('booking:', booking);

          const startDate = new Date(booking.pickUp);
          const endDate = new Date(booking.dropOff);
          const diffTime = Math.abs(endDate - startDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // console.log('booking.car:', booking.car); 

          const totalPrice = booking.car.price * diffDays;
          return {
            ...booking,
            price: totalPrice,
          };
        });
        setBookings(updatedBookings);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };

    fetchBookings();
  }, [user]);

  return (
    <div>
      <h1>Your Bookings</h1>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking.id}>
            <h2>{booking.car.mark} {booking.car.model}</h2>
            <p>Pick-up: {booking.pickUp}</p>
            <p>Drop-off: {booking.dropOff}</p>
            <p>Price: {booking.price}</p>
          </div>
        ))
      ) : (
        <p>You have not made any bookings yet.</p>
      )}
    </div>
  );
};

export default UserBookings;
