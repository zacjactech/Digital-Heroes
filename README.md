# Digital Heroes 🏌️ ⛳ 🏆

> Golf. Charity. Prize Draws. — A subscription platform where members play golf, support charities, and win monthly prizes.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), React 19 |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Animations | Framer Motion v12 (`motion/react`) |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Auth | Supabase Auth (JWT) |
| Database | Supabase PostgreSQL (with RLS) |
| Storage | Supabase Storage (winner proof uploads) |
| Payments | Stripe Checkout + Webhooks |
| Email | Resend |
| Deployment | Vercel |
| Package Mgr | pnpm |

---

## Getting Started

### 1. Prerequisites
- Node.js ≥ 20 (via nvm recommended)
- pnpm ≥ 9
- A Supabase project
- A Stripe account (test mode)
- A Resend account

### 2. Clone & Install

```bash
# Install dependencies
pnpm install
```

### 3. Environment Variables

```bash
cp .env.local.example .env.local
```

Fill in all values in `.env.local`. See `.env.local.example` for descriptions.

| Variable | Where to find it |
|----------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Project Settings → API |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API Keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Developers → API Keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Developers → Webhooks |
| `STRIPE_MONTHLY_PRICE_ID` | Stripe Dashboard → Products |
| `STRIPE_YEARLY_PRICE_ID` | Stripe Dashboard → Products |
| `RESEND_API_KEY` | Resend Dashboard → API Keys |

### 4. Database Setup

```bash
# Option A — Supabase CLI
pnpm supabase db push

# Option B — Supabase Dashboard
# Copy contents of supabase/migrations/001_initial_schema.sql
# Paste into SQL Editor → Run
```

### 5. Generate Supabase Types

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_REF > types/supabase.ts
```

### 6. Stripe Webhook (local development)

```bash
# Install Stripe CLI then:
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET` in `.env.local`.

### 7. Run Development Server

```bash
pnpm dev
```

App runs at [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
/app
  /(public)/          → Landing, Charities
  /(auth)/            → Login, Register
  /(dashboard)/       → Member dashboard, Scores, Draws, Charities, Winnings
  /(admin)/           → Admin dashboard, Users, Draws, Charities, Winners
  /api/               → API routes + Stripe webhook

/components
  /ui/                → Primitive reusable components
  /layout/            → Navbar, Sidebars, Footer, TabBar
  /landing/           → Landing page sections
  /dashboard/         → Dashboard-specific components
  /scores/            → Score entry & history
  /draws/             → Draw results & prize display
  /charities/         → Charity cards & directory
  /admin/             → Admin KPIs, tables, verification

/lib
  /supabase/          → Supabase clients (browser + server + middleware)
  /stripe/            → Stripe client + helpers
  /draw-engine/       → Random/algorithmic draw + prize calculator + matcher
  /email/             → Resend sender + email templates
  /validators/        → Zod schemas

/styles
  /tokens.css         → All CSS custom properties (brand colors, typography, spacing)
  /globals.css        → Global styles + component utilities

/types
  /index.ts           → All TypeScript interfaces
  /supabase.ts        → Database type definitions

/hooks
  /useCountdown.ts    → Countdown timer hook
  /useScores.ts       → Score CRUD hook
  /useSubscription.ts → Subscription status hook

/store
  /useAppStore.ts     → Zustand global store

/supabase
  /migrations/        → SQL migration files
```

---

## Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `forest` | `#1A3C34` | Primary dark — nav, hero, sidebar |
| `gold` | `#C89749` | CTAs, highlights, dividers |
| `emerald` | `#4CAF82` | Success, bullets, positive |
| `canopy` | `#2E6B5E` | Hover state |
| `ink` | `#1C2B26` | Body text |
| `moss` | `#3D5A52` | Labels, secondary text |
| `slate` | `#6B8F84` | Muted text, captions |
| `mist` | `#F4F9F6` | Page background |
| `sage-tint` | `#F0F7F3` | Card backgrounds |
| `leaf-wash` | `#E2F2EA` | Input backgrounds |
| `soft-sage` | `#D0E8DC` | Borders, dividers |

---

## Key Rules (from `.cursor/rules/digital-heroes.mdc`)

- **TypeScript strict mode** — no `any`, explicit return types on all functions
- **Named exports only** — except page.tsx files
- **Mobile-first** — base styles = 375px, `md:` and `lg:` for larger
- **Framer Motion** — always import from `'motion/react'`, never in Server Components
- **Supabase** — server client for mutations, browser client for reads
- **Stitch folder** — always read stitch mockup before implementing any UI
- **Score numbers** — always use `font-mono` / JetBrains Mono

---

## UI Reference Mockups

All stitch mockups are in `/stitch/` — read before implementing any UI:

| Folder | Page |
|--------|------|
| `digital_heroes_landing_page/` | Landing page |
| `authentication_page/` | Login / Register |
| `member_dashboard/` | User dashboard |
| `score_entry_interface/` | Desktop score entry |
| `mobile_score_entry/` | Mobile score entry |
| `monthly_draw_results/` | Draw results |
| `mobile_draw_results/` | Mobile draw results |
| `mobile_dashboard/` | Mobile dashboard |
| `admin_dashboard_overview/` | Admin dashboard |
| `charity_directory/` | Charity listing |
| `winner_verification/` | Admin winner verification |
| `pricing_plans/` | Pricing page |

---

## Draw Engine Logic

```
5-match (Jackpot) = 40% of pool — rolls over if unclaimed
4-match (Second)  = 35% of pool
3-match (Third)   = 25% of pool

Score rolling: users hold max 5 scores. New score auto-deletes oldest.
Unique date constraint: one score per user per date.
```

---

## Deployment (Vercel)

1. Push to GitHub
2. Connect repo in Vercel (use a **new Vercel account** per project rules)
3. Add all environment variables in Vercel Dashboard
4. Add Stripe webhook endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
5. Deploy

---

*Built for Digital Heroes Club — Golf · Charity · Prize Draws*
