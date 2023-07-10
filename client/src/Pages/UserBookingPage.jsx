import React from 'react';
import UserBookings from '../components/UserBookings';

const UserBookingsPage = ({ user }) => {
    return (
        <Selection>
            <HeroPages name="Testimonials" />
            <h1>Your Bookings</h1>
            <UserBookings user={user} />
        </Selection>
    );
};

export default UserBookingsPage;
