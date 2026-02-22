import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";

export async function GET() {
  const { data } = await supabaseAdmin
    .from("orders")
    .select(
      `
      *,
      order_items (*),
      addresses (*)
    `,
    )
    .order("created_at", { ascending: false });

  return NextResponse.json(data);
}
