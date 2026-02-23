import { supabaseAdmin } from "@/app/lib/supabase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    console.log("Attempting to delete email:", cleanEmail);

    const supabase = supabaseAdmin;

    // First, verify the email exists with more flexible matching
    const { data: existing, error: checkError } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .eq("email", cleanEmail)
      .maybeSingle();

    console.log("Check result:", { existing, checkError });

    if (checkError) {
      console.error("Check error:", checkError);
      return NextResponse.json(
        { error: `Database error: ${checkError.message}` },
        { status: 500 }
      );
    }

    if (!existing) {
      // Try to show all emails for debugging
      const { data: allEmails } = await supabase
        .from("newsletter_subscribers")
        .select("*");
      console.log("Available emails in database:", allEmails);
      
      return NextResponse.json(
        { error: "Email not found in our newsletter list" },
        { status: 404 }
      );
    }

    // Delete the subscriber
    const { error: deleteError } = await supabase
      .from("newsletter_subscribers")
      .delete()
      .eq("email", cleanEmail);

    console.log("Delete error:", deleteError);

    if (deleteError) {
      console.error("Supabase delete error:", deleteError);
      return NextResponse.json(
        { error: `Failed to unsubscribe: ${deleteError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Successfully unsubscribed from newsletter" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred: " + String(error) },
      { status: 500 }
    );
  }
}
