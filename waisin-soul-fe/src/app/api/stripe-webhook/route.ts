import Stripe from "stripe";
import { headers } from "next/headers";
import { supabaseAdmin } from "../../lib/supabase-admin";

export async function POST(req: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey || !endpointSecret) {
    return new Response("Stripe is not configured", { status: 503 });
  }

  const stripe = new Stripe(stripeSecretKey);
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");

  if (!sig) {
    return new Response("Missing stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch {
    return new Response("Webhook error", { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    await supabaseAdmin
      .from("orders")
      .update({ status: "paid" })
      .eq("id", paymentIntent.metadata.order_id);
  }

  return new Response("Success", { status: 200 });
}
