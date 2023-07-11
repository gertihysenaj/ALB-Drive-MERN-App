import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroPages from "../components/HeroPages";

const SuccessPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/user-bookings');
        }, 3000);
    }, [navigate]);

    return (
        <div>
            <HeroPages name="Book a Car" />
            <h2 style={{ textAlign: 'center', fontSize: '2rem', color: 'green' }}>Payment Successful</h2>
            <p style={{ textAlign: 'center', fontSize: '1.5rem', color: 'green' }}>Redirecting to your bookings...</p>
        </div>
    );
};

export default SuccessPage;
