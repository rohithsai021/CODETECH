import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Checkout() {
  const [cart, setCart] = useState([]);
  const [stripeToken, setStripeToken] = useState('');

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);
  }, []);

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/orders/checkout`,
        {
          products: cart,
          totalPrice: getTotal(),
          stripeToken,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      localStorage.removeItem('cart');
      alert('Payment successful');
    } catch (error) {
      alert('Payment failed');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <p>Total: ${getTotal()}</p>
      <input
        type="text"
        placeholder="Stripe Token"
        value={stripeToken}
        onChange={(e) => setStripeToken(e.target.value)}
        required
      />
      <button onClick={handlePayment}>Complete Purchase</button>
    </div>
  );
}

export default Checkout;
