import { useEffect, useState } from 'react';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51NMtCwAZgL2TxpbyteMi0Vbr3rcCTuFyx8fU7u8SidcNy0IRBebOzIvSgLlyYOBhWGSHUulY8xcBqXJlhbTqXlQQ009uT9bzCQ');

const StripePage = ({ paymentData, stripePublicKey }) => {
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    // Fetch the clientSecret from the server
    const fetchClientSecret = async () => {
      try {
        const response = await axios.post('/api/create-payment-intent', {
          amount: paymentData.amount,
          userId: paymentData.userId,
          bookingId: paymentData.bookingId,
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error fetching client secret:', error);
      }
    };

    fetchClientSecret();
  }, [paymentData]);

  return (
    <Elements stripe={stripePromise}>
      {clientSecret ? (
        <CheckoutForm clientSecret={clientSecret} paymentData={paymentData} />
      ) : (
        <div>Loading...</div>
      )}
    </Elements>
  );
};

export default StripePage;



