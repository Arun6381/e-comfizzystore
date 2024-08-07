/* eslint-disable react/prop-types */
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./Payment.css";

function PaymentForm({ totalAmount, onPaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:3000/api/create-payment-intent",
        {
          amount: totalAmount * 100,
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
        setError("Payment successfully");
        toast.success("Payment successfully!", {
          className: "custom-toast custom-toast-success",
          progressClassName: "custom-progress",
        });
        onPaymentSuccess();
        setLoading(false);
      }
    } catch (err) {
      toast.error(error || "Payment failed.", {
        className: "custom-toast custom-toast-error",
        progressClassName: "custom-progress",
      });
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="payment-form">
        <h2>Payment</h2>

        <p>Total Amount: ${(totalAmount / 1).toFixed(2)}</p>
        <form onSubmit={handleSubmit}>
          <CardElement className="StripeElement" />
          <button type="submit" disabled={!stripe || loading}>
            {loading ? "Processing..." : "Pay"}
          </button>
        </form>
      </div>
    </>
  );
}

export default PaymentForm;
