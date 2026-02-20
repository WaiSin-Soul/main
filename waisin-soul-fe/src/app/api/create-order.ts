import { supabaseAdmin } from "../lib/supabase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, items } = await req.json();

  const { data, error } = await supabaseAdmin
    .from("orders")
    .insert({ user_id: userId, status: "pending", items })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ order: data?.[0] });
}
