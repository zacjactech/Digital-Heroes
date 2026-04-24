# Reliability Rules for Digital Heroes

## Error Handling

### Required Patterns
- Always handle Supabase errors explicitly
- Always handle Stripe errors explicitly
- Never use empty catch blocks
- Always provide user-friendly error messages

### Supabase Errors
```typescript
// DO: Handle specific error codes
const { data, error } = await supabase.from('scores').select('*')
if (error) {
  if (error.code === '23505') {
    return { error: 'Score already exists for this date' }
  }
  return { error: 'Failed to save score' }
}

// DON'T: Generic catch-all
catch (e) {
  console.log(e) // ❌
}
```

### Stripe Errors
```typescript
// DO: Handle Stripe-specific errors
try {
  const session = await stripe.checkout.sessions.retrieve(sessionId)
} catch (err) {
  if (err.type === 'StripeSignatureVerificationError') {
    return { error: 'Invalid signature' }
  }
  return { error: 'Payment verification failed' }
}
```

## Subscription Validation

### Access Control
```
- Check subscription_status before granting paid features
- Handle grace periods for renewals
- Handle failed payments gracefully
- Implement proper cancellation flow
```

## Data Integrity

### Score Rules
- One score per user per date (unique constraint)
- Max 5 scores per user (auto-delete oldest)
- Validate score values (1-18 holes, 1-10 per hole)
- Verify user ownership before updates

### Draw Engine Reliability
- 5-match (Jackpot): 40% - rolls over if unclaimed
- 4-match: 35%
- 3-match: 25%
- Idempotent draw execution (prevent duplicates)
- Record all draw results for auditing

## Timeout Handling

- Never use setTimeout for critical logic
- Implement request timeouts for external APIs
- Use Next.js ISR/SSR with proper revalidation
- Handle network failures gracefully

## Monitoring

- Log all payment events
- Log subscription status changes
- Log draw executions with timestamps
- Alert on repeated failures