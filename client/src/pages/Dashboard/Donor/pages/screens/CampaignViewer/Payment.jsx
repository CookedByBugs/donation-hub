import React, { useState } from "react";

const Payment = ({ campaign }) => {
  const [state, setState] = useState({
    holder: "",
    email: "",
    cardNumber: "",
    amount: "",
    expiryDate: "",
    cvv: "",
  });
  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state);
  };
  return (
    <div>
      <form className=" p-5 mx-auto shadow-lg rounded-2xl">
        <div className="">
          <h2 className="text-primary font-bold text-2xl ">Payment Details</h2>
          <p className="text-sm text-gray-600 mb-2">
            Secure payment powered by Stripe
          </p>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-2">
          <div className="flex flex-col gap-2">
            <label className="" htmlFor="holder">
              Card Holder Name
            </label>
            <input
              onChange={handleChange}
              className="input-field !py-3"
              placeholder="John Wick"
              type="text"
              name="holder"
              id="holder"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              className="input-field !py-3"
              placeholder="Email"
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="" htmlFor="cardNumber">
              Card Number
            </label>
            <input
              onChange={handleChange}
              className="input-field !py-3"
              placeholder="1234 5678 9012 3456"
              type="number"
              name="cardNumber"
              id="cardNumber"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="amount">Amount</label>
            <input
              onChange={handleChange}
              className="input-field !py-3"
              placeholder="Amount"
              type="number"
              name="amount"
              id="amount"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3 mt-2">
          <div className="flex flex-col gap-2">
            <label className="" htmlFor="expiryDate">
              Expiry Date
            </label>
            <input
              onChange={handleChange}
              className="input-field !py-3"
              placeholder="MM/YY"
              value={state.expiryDate}
              type="text"
              name="expiryDate"
              id="expiryDate"
              maxLength="5"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="" htmlFor="cvv">
              CVV
            </label>
            <input
              onChange={handleChange}
              className="input-field !py-3"
              placeholder="123"
              type="text"
              name="cvv"
              id="cvv"
              maxLength="3"
            />
          </div>
        </div>
        <div className="text-center">
          <button onClick={handleSubmit} className="mt-2 btn-primary !py-3">
            Pay Now
          </button>
          <p className="text-sm mt-2 text-gray-600">
            Your card details are secure and protected by Stripe
          </p>
        </div>
      </form>
      <div className="p-3 bg-white border border-blue-700 rounded-xl">
        <p className="font-semibold text-blue-900 mb-2">Secure & Trusted</p>

        <p className="text-sm text-blue-700 ">
          Your donation is secure and will be used exclusively for this
          campaign. All transactions are encrypted and protected.
        </p>
      </div>
    </div>
  );
};

export default Payment;
