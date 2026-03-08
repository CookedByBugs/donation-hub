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


// const stripe = require("../../utils/stripe");
// const Campaign = require("../../models/campaign/campaign.model");
// const Donation = require("../../models/campaign/donation.model");

// const stripeWebhook = async (req, res) => {
//     const sig = req.headers["stripe-signature"];
//     let event;
//     let paymentIntent;

//     try {
//         event = stripe.webhooks.constructEvent(
//             req.body,
//             sig,
//             process.env.STRIPE_WEBHOOK_SECRET
//         );
//     } catch (error) {
//         console.error("Webhook signature verification failed:", error.message);
//         return res.status(400).send(`Webhook Error: ${error.message}`);
//     }

//     if (event.type === "payment_intent.succeeded") {
//         paymentIntent = event.data.object;

//         try {
//             // Ensure metadata fields exist
//             const { donorId, campaignId } = paymentIntent.metadata;
//             if (!donorId || !campaignId) {
//                 throw new Error("Missing donorId or campaignId in metadata");
//             }

//             await Donation.create({
//                 amount: paymentIntent.amount / 100,
//                 donorId,
//                 campaignId,
//                 paymentIntentId: paymentIntent.id,
//                 status: paymentIntent.status,
//             });

//             await Campaign.findByIdAndUpdate(
//                 campaignId,
//                 { $inc: { raisedAmount: paymentIntent.amount / 100 } }
//             );

//             console.log(`Donation recorded for campaign ${campaignId}`);
//         } catch (dbError) {
//             console.error("Database operation failed:", dbError);
//             // Return 500 so Stripe retries the webhook
//             return res.status(500).send("Webhook handler failed");
//         }
//     }

//     res.json({ received: true });
// };

// module.exports = { stripeWebhook };