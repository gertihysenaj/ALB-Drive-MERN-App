import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/api/bookings')
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bookings", error);
      });
  }, []);

  return (
    <div>
      <h1>Admin - All Bookings</h1>
      {bookings.map((booking) => (
        <div key={booking.id}>
          <h2>{booking.car.mark} {booking.car.model}</h2>
          <p>Pick-up: {booking.pickUp}</p>
          <p>Drop-off: {booking.dropOff}</p>
          <p>Booked by: {booking.user.name}</p>
          <p>Price: ${booking.price}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminBookings;
