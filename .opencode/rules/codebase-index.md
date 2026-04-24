# Codebase Index - Digital Heroes

## Project Overview

A subscription platform for golf members with charity contributions and monthly prize draws.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS v4, Framer Motion, Supabase, Stripe, Resend

---

## Directory Structure

```
app/
├── (public)/           # Landing, charities, pricing
├── (auth)/             # Login, register
├── (dashboard)/        # Member dashboard, scores, draws, winnings
├── (admin)/            # Admin panel
├── actions/            # Server actions (stripe-server.ts)
├── api/                # API routes (webhooks)
└── layout.tsx          # Root layout

components/
├── ui/                 # Primitive components (Button, Card, Input, Modal, etc.)
├── layout/             # Navbar, Footer, TabBar
├── landing/            # Landing page sections
├── dashboard/          # Dashboard-specific components
├── scores/             # Score entry & history
├── admin/              # Admin tables, verification

lib/
├── supabase/           # Browser client, server client, middleware
├── stripe/             # Stripe client, helpers, webhook handlers
├── draw-engine/        # Random draw, prize calculator, matcher
├── email/              # Resend email sender
├── validators/        # Zod schemas
├── utils/              # Utility functions (cn, etc.)
└── types/              # Database types

types/
├── index.ts            # TypeScript interfaces (Score, Profile, Draw, etc.)
└── supabase.ts         # Supabase-generated types

hooks/
├── useScores.ts        # Score CRUD operations
├── useDraws.ts          # Draw data fetching
├── useSubscription.ts  # Subscription status
└── useCountdown.ts     # Countdown timer

store/
└── useAppStore.ts      # Zustand global store

styles/
├── tokens.css          # CSS custom properties (brand colors)
└── globals.css         # Global styles
```

---

## Key Files

### Entry Points

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout with providers |
| `app/(public)/page.tsx` | Landing page |
| `app/(auth)/login/page.tsx` | Login |
| `app/(auth)/register/page.tsx` | Register |
| `app/(dashboard)/dashboard/page.tsx` | Member dashboard |

### Core Libraries

| File | Purpose |
|------|---------|
| `lib/supabase/client.ts` | Browser client (reads only) |
| `lib/supabase/server.ts` | Server client (mutations) |
| `lib/stripe/utils.ts` | Checkout session creation |
| `lib/draw-engine/random.ts` | Random number generation |
| `lib/draw-engine/prize-calculator.ts` | Prize pool distribution |
| `lib/draw-engine/matcher.ts` | Score matching algorithm |

### Server Actions

| File | Purpose |
|------|---------|
| `app/actions/stripe-server.ts` | Checkout initialization |

### API Routes

| File | Purpose |
|------|---------|
| `app/api/webhooks/stripe/route.ts` | Stripe webhook handler |

---

## Database Schema

### Tables

| Table | Purpose | RLS |
|-------|---------|-----|
| `profiles` | User profiles | Yes - own row only |
| `scores` | Golf scores (max 5/user) | Yes - own only |
| `subscriptions` | Stripe subscription data | Via profiles |
| `charities` | Charity information | Public read |
| `draws` | Draw events | Public read (published) |
| `draw_entries` | User entries per draw | Yes - own only |
| `winners` | Winner verification | Yes - own or admin |
| `subscription_events` | Stripe audit log | Service role only |

### Auto-Trigger
- `handle_new_user()` - Auto-creates profile on auth.users insert

### Key Indexes
```sql
idx_scores_user_id, idx_scores_score_date
idx_draws_draw_date, idx_draws_status
idx_draw_entries_draw_id, idx_draw_entries_user_id
idx_winners_draw_id, idx_winners_user_id, idx_winners_status
```

---

## Stripe Integration

### Flow
1. User clicks subscribe → `app/actions/stripe-server.ts` → `createCheckoutSession()`
2. Redirect to Stripe Checkout
3. Webhook: `/api/webhooks/stripe/route.ts` processes events
4. Handlers in `lib/stripe/webhook-handlers.ts`:
   - `handleInvoicePaid()` → Activate subscription
   - `handleSubscriptionUpdated()` → Update status
   - `handleSubscriptionDeleted()` → Cancel subscription
   - `handleDisputeCreated()` → Mark inactive

### Webhook Events to Handle
- `invoice.paid`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `charge.dispute.created`

---

## Draw Engine Logic

```
5-match (Jackpot) = 40% of pool — rolls over if unclaimed
4-match (Second)  = 35% of pool
3-match (Third)   = 25% of pool

Rules:
- Max 5 scores per user
- New score auto-deletes oldest
- One score per user per date
- Numbers drawn: 5 (range 1-45)
```

---

## Component Patterns

### Button Variants
- `primary` - Gold background
- `ghost` - Transparent with gold border
- `outline` - Transparent with sage border
- `danger` - Red background

### Tailwind Classes
- Colors: `forest`, `gold`, `emerald`, `canopy`, `ink`, `moss`, `slate`, `mist`, `sage-tint`, `leaf-wash`, `soft-sage`
- Typography: `font-heading`, `font-mono` for scores

---

## API Patterns

### Supabase Client Usage
```typescript
// Server (mutations)
const supabase = await createClient()

// Client (reads only)
const supabase = createClient()
```

### Error Handling
```typescript
const { data, error } = await supabase.from('table').select('*')
if (error) {
  return { error: error.message }
}
```

### Stripe Checkout
```typescript
import { createCheckoutSession } from '@/lib/stripe/utils'
const checkoutUrl = await createCheckoutSession(userId, priceId, origin)
```

---

## UI Mockups Reference

| Folder | Page |
|--------|------|
| `stitch/digital_heroes_landing_page/` | Landing |
| `stitch/authentication_page/` | Login/Register |
| `stitch/member_dashboard/` | Dashboard |
| `stitch/score_entry_interface/` | Score entry (desktop) |
| `stitch/mobile_score_entry/` | Score entry (mobile) |
| `stitch/monthly_draw_results/` | Draw results |
| `stitch/admin_dashboard_overview/` | Admin |
| `stitch/charity_directory/` | Charities |
| `stitch/winner_verification/` | Admin verification |
| `stitch/pricing_plans/` | Pricing |

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side only |
| `STRIPE_SECRET_KEY` | Server-side only |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Client-side |
| `STRIPE_WEBHOOK_SECRET` | Webhook verification |
| `STRIPE_MONTHLY_PRICE_ID` | Monthly plan |
| `STRIPE_YEARLY_PRICE_ID` | Yearly plan |
| `RESEND_API_KEY` | Email sending |

---

## Brand Colors (CSS Variables)

| Token | Hex | Usage |
|-------|-----|-------|
| `forest` | `#1A3C34` | Primary dark |
| `gold` | `#C89749` | CTAs, highlights |
| `emerald` | `#4CAF82` | Success |
| `canopy` | `#2E6B5E` | Hover state |
| `ink` | `#1C2B26` | Body text |
| `moss` | `#3D5A52` | Labels |
| `slate` | `#6B8F84` | Muted text |
| `mist` | `#F4F9F6` | Background |
| `sage-tint` | `#F0F7F3` | Card bg |
| `leaf-wash` | `#E2F2EA` | Input bg |
| `soft-sage` | `#D0E8DC` | Borders |