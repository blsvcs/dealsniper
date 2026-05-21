# DealSniper Alpha

DealSniper is an alpha demo for a one-button AI car deal finder. The current version uses simulated listing data and demonstrates the core product flow: one click, ranked car deals, AI score, risk checks, and listing preview.

## Current alpha features

- One-button deal scan flow
- AI-style deal score from 0 to 100
- Compact modern responsive UI
- Risk indicators
- Listing text preview
- Listing image preview
- Explanation of scoring criteria
- Premium alert concept

## Tech stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Run locally

```bash
npm install
npm run dev
```

Then open:

```txt
http://localhost:5173
```

## Build

```bash
npm run build
```

## Deploy to Vercel

1. Open Vercel.
2. Import this GitHub repository: `blsvcs/dealsniper`.
3. Keep the default Vite settings.
4. Click Deploy.

Expected settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

## Important alpha notes

This is not yet connected to real ss.com data. The current listings are demo objects inside `src/App.jsx`.

For the next production iteration, add:

- real listing ingestion
- database cache
- scoring backend
- authentication
- alerts
- saved deals
- real listing URLs

## Suggested next architecture

- Frontend: React/Vite or Next.js
- Backend: Supabase or Node API
- Scraper/data ingestion: Apify or custom worker
- AI scoring: OpenAI API
- Payments: Stripe
- Alerts: Telegram bot, email, or push notifications
