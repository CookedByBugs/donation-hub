// routes/payment.js
const express = require("express");
const paymentRouter = express.Router();
const verifyToken = require("../../../middlewares/verifyToken");
const { createPaymentIntent, confirmPayment } = require("../../../controllers/payments/payment.controller");
const { stripeWebhook } = require("../../../controllers/payments/stripewebhook.controller");

paymentRouter.post("/create-payment-intent", verifyToken, createPaymentIntent);
paymentRouter.post("/confirm-payment", verifyToken, confirmPayment);
paymentRouter.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

module.exports = paymentRouter;