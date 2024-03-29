import getRawBody from "raw-body";
import { updateUserByStripeCustomerId } from "./_repository/user-repository";

import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: process.env.STRIPE_API_VERSION as "2020-08-27",
});

// Disable next.js body parsing (stripe needs the raw body to validate the event)
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const headers = req.headers;

  try {
    const rawBody = await getRawBody(req);
    const stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log(`stripeEvent: ${stripeEvent.type}`);

    // Get the object from stripeEvent
    const object = stripeEvent.data.object as any;

    switch (stripeEvent.type) {
      case "checkout.session.completed":
        // Fetch subscription
        // eslint-disable-next-line
        const subscription = await stripe.subscriptions.retrieve(object.subscription);

        // Update the current user
        await updateUserByStripeCustomerId(object.customer, {
          stripeSubscriptionId: subscription.id,
          // Store the priceId (or "plan") for this subscription
          stripePriceId: subscription.items.data[0].price.id,
          // Store the subscription status ("active" or "trialing")
          stripeSubscriptionStatus: subscription.status,
        });

        break;

      case "invoice.payment_succeeded":
        // If a payment succeeded we update stored subscription status to "active"
        // in case it was previously "trialing" or "past_due".
        // We skip if amount due is 0 as that's the case at start of trial period.
        if (object.amount_due > 0) {
          await updateUserByStripeCustomerId(object.customer, {
            stripeSubscriptionStatus: "active",
          });
        }

        break;

      case "invoice.payment_failed":
        // If a payment failed we update stored subscription status to "past_due"
        await updateUserByStripeCustomerId(object.customer, {
          stripeSubscriptionStatus: "past_due",
        });

        break;

      case "customer.subscription.updated":
        await updateUserByStripeCustomerId(object.customer, {
          stripePriceId: object.items.data[0].price.id,
          stripeSubscriptionStatus: object.status,
        });

        // 💡 You could also read "cancel_at_period_end" if you'd like to email user and learn why they cancelled
        // or convince them to renew before their subscription is deleted at end of payment period.
        break;

      case "customer.subscription.deleted":
        // If a subscription was deleted update stored subscription status to "canceled".
        // Keep in mind this won't be called right away if "Cancel at end of billing period" is selected
        // in Billing Portal settings (https://dashboard.stripe.com/settings/billing/portal). Instead you'll
        // get a "customer.subscription.updated" event with a cancel_at_period_end value.
        await updateUserByStripeCustomerId(object.customer, {
          stripeSubscriptionStatus: "canceled",
        });

        break;

      case "customer.subscription.trial_will_end":
        // This event happens 3 days before a trial ends
        // 💡 You could email user letting them know their trial will end or you can have Stripe do that
        // automatically 7 days in advance: https://dashboard.stripe.com/settings/billing/automatic

        break;

      // no default
    }

    // Send success response
    res.send({ status: "success" });
  } catch (error) {
    console.log("stripe webhook error", error);

    // Send error response
    res.send({ status: "error", code: error.code, message: error.message });
  }
};
