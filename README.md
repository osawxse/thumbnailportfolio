# Thumbnail Designer Portfolio

A full-stack portfolio site for a professional YouTube thumbnail designer. It uses Next.js App Router, TypeScript, Tailwind CSS, Payload CMS, SQLite, Motion for React, Zod and Resend.

## Requirements
- Node.js 20.9+
- npm

## 1. Install
```bash
npm install
```

## 2. Configure environment
Copy `.env.example` to `.env` and set `PAYLOAD_SECRET`. For email notifications, add a Resend API key and notification email. Email is optional for local UI development.

```bash
cp .env.example .env
```

On Windows PowerShell:
```powershell
Copy-Item .env.example .env
```

## 3. Start the local database
No separate database server is required. Payload's SQLite adapter creates the database file from `DATABASE_URL`.

## 4. Start the app
```bash
npm run dev
```

Open:
- Website: http://localhost:3000
- Payload Admin: http://localhost:3000/admin

The first visit to `/admin` lets you create the first Payload user.

## 5. Seed demo content
After the first admin user exists, run:
```bash
npm run seed
```

This creates 8 demo thumbnails, 5 clearly marked placeholder testimonials, 6 FAQs, 5 demo clients and Site Settings. If Work content already exists, the seed exits without duplicating the dataset.

## 6. Upload a real thumbnail
1. Open `/admin` and sign in.
2. Open **Media**.
3. Upload a JPG, JPEG, PNG or WEBP thumbnail.
4. Open **Work** and choose **Create new**.
5. Select the uploaded thumbnail.
6. Enter title, channel name, metadata and optional YouTube URL.
7. Set `Published` on.
8. Set `Featured` on if you want it on the homepage.
9. Set `Sort Order` to control ordering.
10. Save.

The public `/gallery` page reads published Work records from Payload. Featured Work is read separately for the homepage.

## 7. Edit content without code
Payload manages:
- Work
- Media
- Testimonials
- FAQs
- Clients
- Applications
- Site Settings

Normal portfolio updates do not require source-code edits.

## 8. Application form
The homepage form posts to `/api/applications`. The server validates the payload with Zod, saves it to the protected Applications collection with status `New`, then attempts to send a Resend notification. If Resend fails after the database save, the application remains stored and the server logs the email failure.

A honeypot field provides basic bot protection. API keys never reach the browser.

## 9. Resend setup
Create a Resend account and configure a verified sending domain for production. Set:
```env
RESEND_API_KEY=re_...
APPLICATION_NOTIFICATION_EMAIL=you@example.com
RESEND_FROM_EMAIL=Portfolio <your-verified-address@example.com>
```

For local UI testing, you can leave Resend variables empty; applications still save to Payload.

## Environment variables
| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | Yes | SQLite database URL, default `file:./data/portfolio.db` |
| `PAYLOAD_SECRET` | Yes | Payload authentication/encryption secret |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL for robots/sitemap |
| `RESEND_API_KEY` | Optional locally / required for email | Resend API key |
| `APPLICATION_NOTIFICATION_EMAIL` | Optional locally / required for email | Notification recipient |
| `RESEND_FROM_EMAIL` | Optional | Resend sender address |

## Production build
```bash
npm run build
npm run start
```

## Third-party accounts
Only Resend requires a third-party account for the requested email notification feature. Payload, SQLite and local media work without external accounts during local development.

## Architecture
```text
Payload CMS
  ↓
SQLite + local Media
  ↓
Next.js server components
  ↓
Homepage / Gallery / Testimonials

Application form
  ↓
Next.js route
  ↓
Zod validation
  ↓
Payload Applications
  ↓
Resend notification
  ↓
Payload Admin review
```

The project uses Payload's database adapter boundary so SQLite can later be replaced with PostgreSQL without rewriting the public UI data-access layer. Local media is isolated in Payload's Media collection so a storage adapter can later replace local storage.

## Verification checklist
- `/`, `/gallery`, `/testimonials` are the only intended public pages.
- `/admin` is authenticated by Payload.
- Work, Testimonials, FAQs and Clients are loaded from Payload at request/revalidation time.
- Featured Work is used on the homepage.
- Applications are protected from anonymous reads.
- Invalid application data is rejected server-side.
- Application records default to `New`.
- Email failure does not remove a saved application.
- Images use `next/image` and Payload-generated sizes.
- Reduced motion is respected by CSS.
- Public pages have metadata, robots and sitemap routes.
