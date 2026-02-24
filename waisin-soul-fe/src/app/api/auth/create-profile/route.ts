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

    // Verify service role key is loaded
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("SUPABASE_SERVICE_ROLE_KEY is not set!");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    console.log("Attempting to create profile for:", { userId, name, email });

    // First, try to insert directly (for new users)
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .insert(
        {
          id: userId,
          name,
          email,
        }
      )
      .select()
      .single();

    // If insert fails due to existing record, try update
    if (error && error.code === '23505') {
      console.log("Profile exists, updating instead");
      const { data: updateData, error: updateError } = await supabaseAdmin
        .from("profiles")
        .update({ name, email })
        .eq('id', userId)
        .select()
        .single();
      
      if (updateError) {
        console.error("Supabase profile update error:", {
          message: updateError.message,
          code: updateError.code,
          details: updateError.details,
          hint: updateError.hint,
        });
        return NextResponse.json(
          { 
            error: updateError.message || "Failed to update profile",
            details: updateError.details,
            code: updateError.code,
          },
          { status: 500 }
        );
      }
      
      console.log("Profile updated successfully:", { userId, name, email });
      return NextResponse.json({ success: true, data: updateData }, { status: 200 });
    }

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
