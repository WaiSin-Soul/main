import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../lib/supabase-admin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.toLowerCase() || "";

    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] });
    }

    // Query Supabase products table
    const { data, error } = await supabaseAdmin
      .from("products")
      //   .select("id, name, description, image_url, category, price")
      .select("id, name, description, image_url, category")
      .eq("is_active", true)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .limit(20);

    if (error) {
      return NextResponse.json({ error: "Search failed" }, { status: 500 });
    }

    // Transform the response to match SearchBar expected format
    const results = (data || []).map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      image: item.image_url,
      collection: item.category,
      basePrice: item.price,
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
