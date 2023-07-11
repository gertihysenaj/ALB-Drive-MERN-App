import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UserBookings = ({ user }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            console.log('Fetching bookings for user', user.id);

            try {
                const response = await axios.get(`http://localhost:8000/api/bookings/${user.id}`);
                console.log('API Response:', response.data);


                const updatedBookings = response.data.data.map((booking) => {
                    console.log('booking:', booking);

                    const startDate = new Date(booking.startDate);
                    const endDate = new Date(booking.endDate);
                    const diffTime = Math.abs(endDate - startDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    const totalPrice = booking.car.price * diffDays;
                    return {
                        ...booking,
                        price: totalPrice,
                        startDate: startDate.toLocaleDateString(),
                        endDate: endDate.toLocaleDateString(),
                        pickUp: booking.pickUp,
                        dropOff: booking.dropOff,
                    };
                });
                console.log('After update:', updatedBookings);

                setBookings(updatedBookings);
            } catch (error) {
                console.error('Failed to fetch bookings:', error);
            }
        };

        fetchBookings();
    }, [user]);

    
    return (
        <div>
          <h1 className="mb-4 my-booking-title text-center">My Bookings</h1>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking.id} className="card custom-card mb-3">
                <div className="card-body">
                  <div className="left-section">
                  <h2 className="card-title">Booked Car: {booking.car.mark} {booking.car.model}</h2>

                    <img src={`http://localhost:8000/${booking.car.img.replace('\\', '/')}`} alt={booking.car.model} />
                  </div>
                  <div className="right-section">
                    <p className="card-text">Pick-up Date: {booking.startDate}</p>
                    <p className="card-text">Pick-up location: {booking.pickUp}</p>  
                    <p className="card-text">Drop-off Date: {booking.endDate}</p>
                    <p className="card-text">Drop-off location: {booking.dropOff}</p>  
                    <p className="card-text">Total Price: {booking.price} $</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>You have not made any bookings yet.</p>
          )}
        </div>
      );
      
};

export default UserBookings;


