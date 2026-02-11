import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-server"

export async function POST(req: Request) {
  const body = await req.json()

  const { name, price, image_url } = body

  const { error } = await supabaseAdmin.from("products").insert({
    name,
    price,
    image_url,
  })

  if (error) {
    return NextResponse.json({ error }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
