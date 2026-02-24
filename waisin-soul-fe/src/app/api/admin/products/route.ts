import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  price: z.number(),
  image_url: z.string(),
  alt_tag: z.string().optional(),
  description: z.string().optional(),
  stock: z.number().int().nonnegative().optional(),
  collection: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const collection = url.searchParams.get("collection");
    const subcategory = url.searchParams.get("subcategory");
    const id = url.searchParams.get("id");
    const isFeatured = url.searchParams.get("is_featured");
    const isActive = url.searchParams.get("is_active");

    let query = supabaseAdmin
      .from("products")
      .select("*");

    if (collection) query = query.eq("category", collection);
    if (subcategory) query = query.eq("subcategory", subcategory);
    if (id) query = query.eq("id", id);
    if (isFeatured === "true") query = query.eq("is_featured", true);
    if (isActive === "true") query = query.eq("is_active", true);

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      console.error("Products fetch error:", error);
      return NextResponse.json(
        { 
          error: error.message,
          details: error.details || error.hint || null
        }, 
        { status: 400 }
      );
    }

    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error("Products API exception:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("products").insert(parsed.data);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
