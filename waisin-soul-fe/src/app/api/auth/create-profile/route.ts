import { supabaseAdmin } from "../../../lib/supabase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId, name, email } = await request.json();

    if (!userId || !name || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("profiles")
      .upsert(
        {
          id: userId,
          name,
          email,
        },
        { onConflict: "id" }
      );

    if (error) {
      console.error("Supabase profile creation error:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        fullError: JSON.stringify(error),
      });
      return NextResponse.json(
        { 
          error: error.message || "Failed to create profile",
          details: error.details,
          code: error.code,
        },
        { status: 500 }
      );
    }

    console.log("Profile created successfully:", { userId, name, email });
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Error creating profile:", error);
    return NextResponse.json(
      { 
        error: "Failed to create profile",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
