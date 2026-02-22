import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase-server";
import { z } from "zod";

const subscribeSchema = z.object({
  email: z.string().email("Invalid email address").max(200),
});

// Rate limiting map: email -> { count, expiresAt }
const rateLimitMap = new Map<
  string,
  { count: number; expiresAt: number }
>();

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(email);

  // Clean up expired entries
  if (record && record.expiresAt < now) {
    rateLimitMap.delete(email);
  }

  const current = rateLimitMap.get(email);
  
  if (!current) {
    // First request from this email
    rateLimitMap.set(email, { count: 1, expiresAt: now + 60 * 60 * 1000 }); // 1 hour
    return false;
  }

  // Allow max 3 requests per hour
  if (current.count >= 3) {
    return true;
  }

  current.count++;
  return false;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validation = subscribeSchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    const { email } = validation.data;

    // Rate limiting
    if (isRateLimited(email)) {
      return NextResponse.json(
        { error: "Too many subscription attempts. Please try again later." },
        { status: 429 }
      );
    }

    // Save to Supabase
    const supabase = await createClient();
    
    // Check if email already exists
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json(
        { message: "You're already subscribed!" },
        { status: 200 }
      );
    }

    // Insert new subscriber
    const { error: insertError } = await supabase
      .from("newsletter_subscribers")
      .insert([
        {
          email,
          subscribed_at: new Date().toISOString(),
          is_active: true,
        },
      ]);

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Successfully subscribed!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
