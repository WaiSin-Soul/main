import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  price: z.number(),
  image_url: z.string(),
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

    const filters: Record<string, string> = {};
    if (collection) filters.category = collection;
    if (subcategory) filters.subcategory = subcategory;
    if (id) filters.id = id;

    const { data, error } = await supabaseAdmin
      .from("products")
      .select("*")
      .match(filters)
      .order("created_at", { ascending: false });

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
