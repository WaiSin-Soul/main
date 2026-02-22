import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { z } from "zod";
import { supabaseAdmin } from "../../lib/supabase-admin";

const itemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
  image: z.string().optional(),
});

const requestSchema = z.object({
  email: z.string().email(),
  items: z.array(itemSchema).min(1),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { email, items } = parsed.data;
  const guestToken = randomUUID();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const { data, error } = await supabaseAdmin
    .from("orders")
    .insert({
      user_id: null,
      guest_email: email,
      guest_token: guestToken,
      total_amount: total,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    orderId: data.id,
    guestToken,
    total,
  });
}
