# Security Rules for Digital Heroes

## Critical Security Rules

### Never Compromise
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to client-side code
- Never log API keys, secrets, or user credentials
- Never commit secrets to git - use `.env` files only
- Validate Stripe webhook signatures before processing
- Use parameterized queries to prevent SQL injection

### Authentication
- Always verify subscription status before granting access
- Use server client (`lib/supabase/server.ts`) for all mutations
- Use browser client (`lib/supabase/client.ts`) for reads only
- Validate JWT tokens on every protected route

### Data Protection
- Never expose user emails in client responses
- Use RLS policies to restrict data access
- Hash sensitive data before storage
- Sanitize all user inputs with Zod schemas

### API Security
- Never use `eval()` or `new Function()`
- Never return raw database errors to client
- Implement rate limiting on all endpoints
- Use CSRF protection on state-changing operations

## Webhook Security

```
Endpoint: /api/webhooks/stripe
- Verify Stripe signature header
- Idempotency check (prevent duplicate processing)
- Log all webhook events for auditing
- Handle failures gracefully with proper HTTP codes
```

## Database Security

```
Tables with RLS:
- profiles: user_id = auth.uid() only
- scores: user_id = auth.uid() only
- subscriptions: user_id = auth.uid() only

Never disable RLS in production.
```