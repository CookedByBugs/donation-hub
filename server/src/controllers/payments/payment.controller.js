const stripe = require("../../utils/stripe")

const createPaymentIntent = async (req, res) => {
    try {
        const { amount, campaignId } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe uses cents
            currency: "usd",
            metadata: {
                campaignId,
                donorId: req.user.id
            }
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createPaymentIntent }