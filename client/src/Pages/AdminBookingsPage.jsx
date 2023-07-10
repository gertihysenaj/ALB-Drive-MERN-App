import React from 'react';
import AdminBookings from '../components/AdminBookings';
import HeroPages from "../components/HeroPages";


const AdminBookingsPage = ({ user }) => {
    return (
        <>
            <section>
                <HeroPages name="Admin Bookings" />
                <AdminBookings user={user} />
            </section>
        </>

    );
};

export default AdminBookingsPage;
