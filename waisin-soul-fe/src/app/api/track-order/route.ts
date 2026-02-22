import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../lib/supabase-admin";

export async function POST(req: Request) {
  const { orderId, guestToken } = await req.json();

  const { data } = await supabaseAdmin
    .from("orders")
    .select(
      `
      *,
      order_items (*),
      addresses (*)
    `,
    )
    .eq("id", orderId)
    .eq("guest_token", guestToken)
    .single();

  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
