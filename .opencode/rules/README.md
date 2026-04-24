# Digital Heroes - Comprehensive Rules Index

This directory contains the complete rule set for developing the Digital Heroes project with minimal errors, security vulnerabilities, privacy issues, and scalability problems.

## Quick Reference

| Category | File | Priority |
|----------|------|----------|
| Security | `.opencode/rules/security.md` | Critical |
| Reliability | `.opencode/rules/reliability.md` | High |
| Scalability | `.opencode/rules/scalability.md` | High |
| Privacy | `.opencode/rules/privacy.md` | High |
| Forbidden | `.opencode/rules/forbidden.md` | Critical |

## Before Any Commit

Run these checks in order:
```bash
pnpm lint -> pnpm typecheck -> pnpm build
```

If any fail, fix before proceeding.

## Critical Rules Summary

### Security (Non-Negotiable)
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to client
- Never log secrets or PII
- Validate Stripe webhook signatures
- Use parameterized queries
- Validate all inputs with Zod
- RLS on all tables

### Reliability
- Handle all Supabase/Stripe errors
- Check subscription status before access
- Implement score limits (max 5)
- One score per user per date

### Scalability
- Pagination on all lists
- Proper database indexes
- Rate limiting

### Privacy
- Never expose emails client-side
- RLS policies on all tables
- Hash sensitive data

### Forbidden Patterns
- No `any` type
- No console.log in code
- No hardcoded secrets
- No `eval()`
- No empty catch blocks