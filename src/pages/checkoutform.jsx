import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const CheckoutForm = ({ amount, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/payment/create-payment-intent",
          { amount },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    createPaymentIntent();
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || isProcessing) {
      return;
    }

    setIsProcessing(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    setIsProcessing(false);

    if (result.error) {
      console.error("Payment failed:", result.error.message);
    } else if (
      result.paymentIntent &&
      result.paymentIntent.status === "succeeded"
    ) {
      console.log("Payment succeeded!");
      onPaymentSuccess();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label
          htmlFor="card-element"
          className="block text-sm font-medium text-gray-700"
        >
          Credit or debit card
        </label>
        <CardElement
          id="card-element"
          options={CARD_ELEMENT_OPTIONS}
          className="p-3 border border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || !clientSecret || isProcessing}
        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300"
      >
        {isProcessing ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

CheckoutForm.propTypes = {
  amount: PropTypes.number.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
};

export default CheckoutForm;
