import React from 'react';
import UserBookings from '../components/UserBookings';
import HeroPages from "../components/HeroPages";


const UserBookingsPage = ({ user }) => {
    return (
        <Section>
            <HeroPages name="Testimonials" />
            <h1>Your Bookings</h1>
            <UserBookings user={user} />
        </Section>
    );
};

export default UserBookingsPage;
