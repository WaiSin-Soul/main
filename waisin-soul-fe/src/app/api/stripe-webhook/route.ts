import Stripe from "stripe";
import { headers } from "next/headers";
import { supabaseAdmin } from "../../lib/supabase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature")!;

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
