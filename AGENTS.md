# AGENTS.md — Digital Heroes

## Developer Commands

```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm build       # Production build
pnpm lint        # ESLint check
pnpm typecheck  # TypeScript check
pnpm supabase db push  # Push DB migrations to Supabase
```

## Required Command Order

```bash
pnpm lint -> pnpm typecheck -> pnpm build
```

Run these before committing. If you can't build, you can't deploy.

## Key Architecture

- **Route Groups**: `app/(public)/`, `app/(auth)/`, `app/(dashboard)/`, `app/(admin)/`
- **Supabase**: Server client (`lib/supabase/server.ts`) for mutations; browser client (`lib/supabase/client.ts`) for reads
- **Stripe**: Uses Checkout Sessions + webhooks. Webhook endpoint: `/api/webhooks/stripe`
- **Database migrations**: `supabase/migrations/` (push via `pnpm supabase db push`)

## Critical Conventions

| Rule | Details |
|------|---------|
| **No `any`** | TypeScript strict mode enabled |
| **Explicit return types** | All functions must have return types |
| **Named exports only** | Except `page.tsx` files |
| **Framer Motion** | Import from `'motion/react'` only — never in Server Components |
| **UI mockups** | Always read `stitch/<folder>/code.html` before implementing any UI |
| **Score numbers** | Use `font-mono` / JetBrains Mono |

## Mobile-First

Base styles target 375px. Use `md:` and `lg:` breakpoints for larger screens.

## Draw Engine

```
5-match (Jackpot) = 40% of pool — rolls over if unclaimed
4-match (Second)  = 35% of pool
3-match (Third)   = 25% of pool

Max 5 scores per user. New score auto-deletes oldest.
One score per user per date (unique constraint).
```

## Environment Setup

1. Copy `.env.local.example` to `.env.local`
2. Fill all Supabase, Stripe, and Resend keys
3. For local Stripe webhooks: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

For full setup, see `README.md` and `STRIPE_SETUP.md`.

## Comprehensive Rules

See `.opencode/rules/` for detailed rules:

| File | Content |
|------|---------|
| `security.md` | Critical security rules, webhook handling, RLS policies |
| `reliability.md` | Error handling, subscription validation, data integrity |
| `scalability.md` | Pagination, indexes, rate limiting, caching |
| `privacy.md` | Data classification, RLS, email privacy |
| `forbidden.md` | Absolute bans (any, console.log, eval, hardcoded secrets) |

## Critical Security

- Never expose `SUPABASE_SERVICE_ROLE_KEY` to client
- Never log PII (emails, names in console)
- Validate Stripe webhook signatures
- Use parameterized queries (no SQL concatenation)
- RLS on ALL tables in production

## Reliability Checklist

- [ ] Handle all Supabase `error` objects
- [ ] Handle all Stripe errors
- [ ] Never empty catch blocks
- [ ] Check subscription before paid feature access
- [ ] Implement score limits (max 5, unique date)

## Privacy Checklist

- [ ] Never expose emails in client responses
- [ ] RLS policies on profiles, scores, subscriptions
- [ ] Validate all inputs with Zod schemas