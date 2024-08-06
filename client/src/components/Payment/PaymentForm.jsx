import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./Payment.css";

const stripePromise = loadStripe(
  "pk_test_51PhofJRtoqmg9Y2cedNrDonsTnlL935F7VtmD8Aphshi1uiMkbhWZlYiMHgUThEFMoSsN44itVoADb78xcxUBfMA00IjzPhCdc"
);

function PaymentForm({ totalAmount, onPaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:3000/api/create-payment-intent",
        {
          amount: totalAmount,
        }
      );

      const { clientSecret } = data;

      const cardElement = elements.getElement(CardElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        setError(error.message);
        setLoading(false);
      } else if (paymentIntent.status === "succeeded") {
        alert("Payment successful!");
        onPaymentSuccess();
        setLoading(false);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="payment-form">
      <h2>Payment</h2>
      <form onSubmit={handleSubmit}>
        <CardElement className="StripeElement" />
        <button type="submit" disabled={!stripe || loading}>
          {loading ? "Processing..." : "Pay"}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

function App() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}

export default App;
