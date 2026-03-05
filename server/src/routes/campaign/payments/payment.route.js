// routes/payment.js
const express = require("express");
const paymentRouter = express.Router();
const { createPaymentIntent } = require("../../../controllers/payments/payment.controller")
paymentRouter.post("/create-payment-intent", createPaymentIntent);

module.exports = paymentRouter;