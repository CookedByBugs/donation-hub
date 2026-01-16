import React, { useState } from 'react'

const Payment = ({ campaign }) => {
    const [state, setState] = useState({
        holder: '',
        cardNumber: '',
        amount: '',
        expiryDate: '',
        cvv: '',
    });
    const handleChange = e => setState({ ...state, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(state);
    }
    return (
        <div>
            <form className='max-w-[500px] p-5 mx-auto shadow-lg shadow-black/40 rounded-2xl'>
                <div className=''>
                    <h2 className='text-primary font-bold text-2xl '>Payment Details</h2>
                    <p className='text-sm text-gray-600 mb-2'>Secure payment powered by Stripe</p>
                </div>
                <div className="flex flex-col gap-2">
                    <label className='mt-2' htmlFor="holder">Card Holder Name</label>
                    <input onChange={handleChange} className='input-field !py-3' placeholder='John Wick' type="text" name="holder" id="holder" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className='mt-2' htmlFor="cardNumber">Card Number</label>
                    <input onChange={handleChange} className='input-field !py-3' placeholder='1234 5678 9012 3456' type="number" name="cardNumber" id="cardNumber" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="amount">Amount</label>
                    <input onChange={handleChange} className='input-field !py-3' placeholder='Amount' type="number" name="amount" id="amount" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className='mt-2' htmlFor="expiryDate">Expiry Date</label>
                    <input onChange={handleChange} className='input-field !py-3' placeholder='MM/YY' type="text" name="expiryDate" id="expiryDate" maxLength="5" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className='mt-2' htmlFor="cvv">CVV</label>
                    <input onChange={handleChange} className='input-field !py-3' placeholder='123' type="text" name="cvv" id="cvv" maxLength="3" />
                </div>
                <div className='text-center'>
                    <button onClick={handleSubmit} className="mt-2 btn-primary !py-3">Pay Now</button>
                    <p className='text-sm text-gray-600'>Your card details are secure and protected by Stripe</p>
                </div>
            </form>
        </div>
    )
}

export default Payment