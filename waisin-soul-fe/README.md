This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Contact Form Email Setup

To enable server-side contact form sending with Resend (no app password required), add these environment variables in your local env file:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx

# Need to set Domain for production
RESEND_FROM="Waisin Soul <onboarding@resend.dev>"

# Optional: make sender change based on selected contact type
RESEND_FROM_ART="Waisin Soul Art <onboarding@resend.dev>"
RESEND_FROM_COACHING="Waisin Coaching <onboarding@resend.dev>"

# Optional recipient overrides (defaults already match current contact page emails)
CONTACT_EMAIL_ART=waisinsoulart@gmail.com
CONTACT_EMAIL_COACHING=waisin.lovelifechanger@gmail.com
```

The contact form API route uses:

- Recipient toggle (`Art` or `Coaching`) to route the message
- Sender toggle via `RESEND_FROM_ART` / `RESEND_FROM_COACHING` (fallbacks to `RESEND_FROM`)
- Rate limiting (`5` requests per `10` minutes per IP/email)
- Honeypot field to catch bots
- Minimum submit-time check to block instant bot posts

Note: for production deliverability, verify your sending domain in Resend and use `from` addresses on that domain.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
