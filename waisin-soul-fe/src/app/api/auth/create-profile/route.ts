import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { userId, name, email } = await request.json();
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!userId || !name || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify service role key is loaded
    if (!serviceRoleKey) {
      console.error("SUPABASE_SERVICE_ROLE_KEY is not set!");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (anonKey && serviceRoleKey === anonKey) {
      console.error("SUPABASE_SERVICE_ROLE_KEY is misconfigured (matches anon key)");
      return NextResponse.json(
        {
          error: "Server configuration error",
          details:
            "SUPABASE_SERVICE_ROLE_KEY must be the service role/secret key, not NEXT_PUBLIC_SUPABASE_ANON_KEY.",
        },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
        db: {
          schema: "public",
        },
      }
    );

    console.log("Attempting to create profile for:", { userId, name, email });

    const { data, error } = await supabaseAdmin
      .from("profiles")
      .upsert(
        {
          id: userId,
          name,
          email,
        },
        { onConflict: "id" }
      )
      .select()
      .single();

    if (error) {
      console.error("Supabase profile creation error:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        fullError: JSON.stringify(error),
      });
      const isRlsError = error.code === "42501";

      return NextResponse.json(
        {
          error: error.message || "Failed to create profile",
          details: error.details,
          code: error.code,
          hint: isRlsError
            ? "RLS policy blocked INSERT/UPDATE on profiles. Ensure authenticated users can insert/update their own profile and service_role has full access."
            : error.hint,
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
