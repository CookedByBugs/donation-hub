import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const Payment = ({ campaign }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [state, setState] = useState({
    holder: "",
    email: "",
    amount: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payment/create-payment-intent`,
        {
          amount: state.amount,
          campaignId: campaign._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );

      const cardElement = elements.getElement(CardElement);

      const result = await stripe.confirmCardPayment(res.data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: state.holder,
            email: state.email,
          },
        },
      });

      if (result.error) {
        console.log(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        console.log("Payment successful", result.paymentIntent);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-lg rounded-2xl space-y-4"
      >
        <div>
          <h2 className="text-primary font-bold text-2xl">Payment Details</h2>
          <p className="text-sm text-gray-600">
            Secure payment powered by Stripe
          </p>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="holder">Card Holder Name</label>
            <input
              name="holder"
              id="holder"
              placeholder="John Wick"
              className="input-field !py-3"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="john@email.com"
              className="input-field !py-3"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="amount">Donation Amount</label>
          <input
            name="amount"
            id="amount"
            type="number"
            placeholder="Enter amount"
            className="input-field !py-3"
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Card Details</label>
          <div className="p-3 border rounded-lg bg-gray-50">
            <CardElement />
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full btn-primary !py-3"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Your card details are encrypted and processed securely by Stripe.
        </p>
      </form>

      <div className="mt-4 p-4 bg-white border border-blue-700 rounded-xl">
        <p className="font-semibold text-blue-900 mb-2">Secure & Trusted</p>

        <p className="text-sm text-blue-700">
          Your donation is secure and will be used exclusively for this
          campaign. All transactions are encrypted and protected.
        </p>
      </div>
    </div>
  );
};

export default Payment;
