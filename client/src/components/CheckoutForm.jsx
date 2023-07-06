import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ clientSecret, paymentData }) => {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
    } else {
      axios
        .post('/api/process-payment', {
          token: result.token.id,
          amount: paymentData.amount,
          userId: paymentData.userId,
          bookingId: paymentData.bookingId,
        })
        .then((response) => {
          setProcessing(false);
          if (response.data.success) {
            setPaymentMethod(response.data.data);
          } else {
            setError(response.data.error);
          }
        })
        .catch((error) => {
          setError('Payment failed');
          setProcessing(false);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="card-element">
          Card Number
        </label>
        <div id="card-element">
          <CardElement />
        </div>
        {error && <div>{error}</div>}
      </div>
      <button type="submit" disabled={!stripe || processing}>
        {processing ? 'Processing...' : 'Pay'}
      </button>
      {paymentMethod && <div>Payment successful</div>}
    </form>
  );
};

export default CheckoutForm;

