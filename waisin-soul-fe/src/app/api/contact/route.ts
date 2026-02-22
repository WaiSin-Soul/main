import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().min(3).max(200),
  message: z.string().trim().min(10).max(5000),
  contactType: z.enum(["art", "coaching"]),
  website: z.string().optional(),
  startedAt: z.number().int().positive(),
});

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MIN_FORM_FILL_TIME_MS = 3000;

type RateLimitEntry = {
  count: number;
  expiresAt: number;
};

const requestLog = new Map<string, RateLimitEntry>();

function getClientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return req.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const existing = requestLog.get(key);

  if (!existing || existing.expiresAt <= now) {
    requestLog.set(key, {
      count: 1,
      expiresAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  existing.count += 1;
  requestLog.set(key, existing);
  return false;
}

function getRequiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      const field = firstIssue?.path?.join(".") || "form";
      const message = firstIssue?.message || "Invalid input";

      return NextResponse.json(
        {
          error: `${field}: ${message}`,
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const data = parsed.data;

    if (data.website && data.website.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    const elapsed = Date.now() - data.startedAt;
    if (elapsed < MIN_FORM_FILL_TIME_MS) {
      return NextResponse.json({ success: true });
    }

    const ip = getClientIp(req);
    const rateLimitKey = `${ip}:${data.email.toLowerCase()}`;
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { error: "Too many messages. Please try again later." },
        { status: 429 },
      );
    }

    const resendApiKey = getRequiredEnv("RESEND_API_KEY");
    const defaultFrom = getRequiredEnv("RESEND_FROM");

    const artEmail = process.env.CONTACT_EMAIL_ART ?? "waisinsoulart@gmail.com";
    const coachingEmail =
      process.env.CONTACT_EMAIL_COACHING ?? "waisin.lovelifechanger@gmail.com";

    const to = data.contactType === "art" ? artEmail : coachingEmail;

    const from =
      data.contactType === "art"
        ? (process.env.RESEND_FROM_ART ?? defaultFrom)
        : (process.env.RESEND_FROM_COACHING ?? defaultFrom);

    const safeSubject = data.subject.replace(/[\r\n]/g, " ").trim();
    const escapedName = escapeHtml(data.name);
    const escapedEmail = escapeHtml(data.email);
    const escapedType = escapeHtml(data.contactType);
    const escapedSubject = escapeHtml(safeSubject);
    const escapedMessage = escapeHtml(data.message).replace(/\n/g, "<br/>");

    const buildBody = (fromAddress: string) => ({
      from: fromAddress,
      to: [to],
      reply_to: data.email,
      subject: `[${data.contactType === "art" ? "Art" : "Coaching"}] ${safeSubject}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Type: ${data.contactType}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
      html: `
        <p><strong>Name:</strong> ${escapedName}</p>
        <p><strong>Email:</strong> ${escapedEmail}</p>
        <p><strong>Type:</strong> ${escapedType}</p>
        <p><strong>Subject:</strong> ${escapedSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${escapedMessage}</p>
      `,
    });

    let resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildBody(from)),
    });

    if (!resendResponse.ok) {
      const initialErrorText = await resendResponse.text();
      const looksLikeUnverifiedDomainError =
        resendResponse.status === 403 &&
        initialErrorText.toLowerCase().includes("domain") &&
        initialErrorText.toLowerCase().includes("not verified");

      if (looksLikeUnverifiedDomainError) {
        const fallbackFrom =
          data.contactType === "art"
            ? "Waisin Soul Art <onboarding@resend.dev>"
            : "Waisin Coaching <onboarding@resend.dev>";

        resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(buildBody(fallbackFrom)),
        });

        if (!resendResponse.ok) {
          console.error("Resend API error after fallback:", initialErrorText);
        }
      } else {
        console.error("Resend API error:", initialErrorText);
      }
    }

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();
      console.error("Resend API error:", resendError);
      let resendMessage =
        "Unable to send message right now. Please try again shortly.";
      try {
        const parsedError = JSON.parse(resendError) as {
          message?: string;
          error?: string;
        };
        resendMessage =
          parsedError.message || parsedError.error || resendMessage;
      } catch {
        if (resendError) {
          resendMessage = resendError;
        }
      }

      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV === "development"
              ? `Resend error (${resendResponse.status}): ${resendMessage}`
              : "Unable to send message right now. Please try again shortly.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Unable to send message right now. Please try again shortly." },
      { status: 500 },
    );
  }
}
