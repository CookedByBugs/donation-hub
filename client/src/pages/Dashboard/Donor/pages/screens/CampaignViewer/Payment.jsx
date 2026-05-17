import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { message } from "antd";

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
    console.log("goal", campaign.goalAmount);
    console.log("ongoing", state.amount);
    if (campaign.goalAmount - campaign.raisedAmount < Number(state.amount)) {
      return message.warning("Amount is greater than campaign goal amount");
    }

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
        message.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/payment/confirm-payment`,
          { paymentIntentId: result.paymentIntent.id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          },
        );
        message.success("Payment successful! Thank you for your donation.");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8 flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <h2 className="text-gray-800 font-bold md:text-2xl text-xl flex items-center gap-3">
            <span className="bg-primary/10 text-primary p-2 rounded-xl  h-10 w-10 flex items-center justify-center">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </span>
            <span>Make a Donation</span>
          </h2>
          <p className="text-sm text-gray-500 mt-2 font-medium">
            Secure payment powered by Stripe
          </p>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="holder"
              className="text-sm font-semibold text-gray-700"
            >
              Card Holder Name
            </label>
            <input
              name="holder"
              id="holder"
              placeholder="John Doe"
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-medium"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="john@example.com"
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary/50 focus:bg-white transition-all text-sm font-medium"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 pt-2">
          <label
            htmlFor="amount"
            className="text-sm font-semibold text-gray-700"
          >
            Donation Amount ($)
          </label>
          <input
            name="amount"
            id="amount"
            type="number"
            placeholder="Enter amount"
            className="px-4 py-3 text-lg bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-primary/50 focus:bg-white transition-all font-bold text-gray-800 tracking-wide"
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="flex flex-col gap-1.5 pt-2">
          <label className="text-sm font-semibold text-gray-700">
            Card Details
          </label>
          <div className="p-4 border border-gray-200 rounded-xl bg-gray-50 transition-all focus-within:bg-white focus-within:border-primary/50">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#1f2937",
                    "::placeholder": {
                      color: "#9ca3af",
                    },
                  },
                  invalid: {
                    color: "#ef4444",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full btn-primary text-base py-3.5 rounded-xl font-bold tracking-wide shadow-md hover:shadow-lg transition-all"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>

        <p className="text-xs text-gray-400 font-medium text-center">
          Your card details are encrypted and processed securely by Stripe.
        </p>
      </form>

      <div className="p-4 bg-sky-50 border border-sky-100 rounded-2xl flex gap-3">
        <div className="text-sky-500 flex items-start justify-center">
          <svg
            className="w-6 h-6 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-sky-800 text-sm mb-1">
            Secure & Trusted
          </p>
          <p className="text-xs text-sky-700/80 font-medium leading-relaxed">
            Your donation is secure and will be used exclusively for this
            campaign. All transactions are encrypted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
