const stripe = require("../../utils/stripe")
const Campaign = require("../../models/campaign/campaign.model")
const Donation = require("../../models/campaign/donation.model")
const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"]
    let event;
    let paymentIntent
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig, process.env.STRIPE_WEBHOOK_SECRET
        );

    } catch (error) {
        console.log(error)
        return res.status(400).json(`WEBHOOK ERROR ${error.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
        paymentIntent = event.data.object;
        await Donation.create({
            amount: paymentIntent.amount / 100,
            donorId: paymentIntent.metadata.donorId,
            campaignId: paymentIntent.metadata.campaignId,
            paymentIntentId: paymentIntent.id,
            status: paymentIntent.status,
        })

        await Campaign.findByIdAndUpdate(
            paymentIntent.metadata.campaignId,
            {
                $inc: { raisedAmount: paymentIntent.amount / 100 }
            }
        );
    }

    res.json({ recieved: true })
}

module.exports = { stripeWebhook }