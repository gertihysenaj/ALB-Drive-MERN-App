import React from 'react';
import UserBookings from '../components/UserBookings';
import HeroPages from "../components/HeroPages";


const UserBookingsPage = ({ user }) => {
    return (
        <>
            <section>
                <HeroPages name="My Bookings" />
                <UserBookings user={user} />
            </section>
        </>

    );
};

export default UserBookingsPage;
