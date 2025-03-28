import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const stripePromise = loadStripe(
  "pk_test_51R6xZMI1bsoZ9PKQQmN9NlgoKjzflAarX1jEnGuhbY82UQQrHEl7fMWaTwYRsXJK7Vuqza0RC53fwG3eZoWav6EV00r6bZlYvh"
);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded yet!");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: 5000,
          }),
        }
      );

      const { clientSecret, error: backendError } = await response.json();
      if (backendError) throw new Error(backendError);

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (confirmError) throw new Error(confirmError.message);

      setPaymentSuccess(true);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);   
    }
  };

  if (paymentSuccess) {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>Payment Successful!</h2>
        <DotLottieReact
          src="https://lottie.host/ceb58d08-2b69-493d-a854-8becddf4dfa3/uWnZBKPuq4.lottie"
          loop
          autoplay
          style={{ width: "300px", margin: "0 auto" }}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handlePayment} style={{ textAlign: "center" }}>
      <CardElement options={{ hidePostalCode: true }} />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
};

const StripePayment = () => {
  return (
    <Elements stripe={stripePromise}>
      <h1>Stripe Payment </h1>
      <PaymentForm />
    </Elements>
  );
};

export default StripePayment;