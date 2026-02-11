import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../lib/supabase-admin";
import { randomUUID } from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { items, userId, guestEmail } = await req.json();

  const guestToken = userId ? null : randomUUID();

  const total = items.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0,
  );

  const { data: order } = await supabaseAdmin
    .from("orders")
    .insert({
      user_id: userId || null,
      guest_email: guestEmail || null,
      guest_token: guestToken,
      total_amount: total,
    })
    .select()
    .single();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(total * 100),
    currency: "usd",
    metadata: { order_id: order.id },
  });

  await supabaseAdmin
    .from("orders")
    .update({ stripe_payment_intent: paymentIntent.id })
    .eq("id", order.id);

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
    orderId: order.id,
    guestToken,
  });
}
