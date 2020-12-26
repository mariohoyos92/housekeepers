import requireAuth from "./_require-auth";
import { getUserById } from "./_repository/user-repository";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: process.env.STRIPE_API_VERSION as "2020-08-27",
});

export default requireAuth(async (req, res) => {
  const user = req.user;

  try {
    const { stripeCustomerId } = await getUserById(user.uid);

    // Create a billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${process.env.STRIPE_DOMAIN}/settings/general`,
    });

    // Return success response
    res.send({ status: "success", data: session });
  } catch (error) {
    console.log("stripe-create-billing-session error", error);

    // Return error response
    res.send({ status: "error", code: error.code, message: error.message });
  }
});
