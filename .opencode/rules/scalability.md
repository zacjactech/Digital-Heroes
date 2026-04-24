# Scalability Rules for Digital Heroes

## Database Scalability

### Indexes Required
```sql
-- Scores table
CREATE INDEX idx_scores_user_date ON scores(user_id, date DESC);
CREATE INDEX idx_scores_created ON scores(created_at DESC);

-- Users table
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_subscription ON users(subscription_status);
```

### Pagination
- All list endpoints must support pagination
- Default page size: 20 items
- Maximum page size: 100 items
- Use cursor-based pagination for large datasets

### Query Optimization
- Use `.select()` with specific columns
- Implement data compression for large responses
- Cache frequently accessed data
- Use Supabase Realtime only where needed

## Score Management

### Limits
```
Max scores per user: 5
New score auto-deletes oldest
One score per user per date
Score retention: Indefinite (if under limit)
```

### Architecture
```
User Score Flow:
1. User submits score
2. Check current count
3. If count >= 5, delete oldest
4. Insert new score
5. Verify unique date constraint
```

## Draw Engine Scaling

### Prize Pool Distribution
```
5-match (Jackpot): 40% of pool - rolls over if unclaimed
4-match: 35%
3-match: 25%

Roll-over: Jackpot carries to next draw if unclaimed after 30 days
```

### Performance
- Pre-calculate match probabilities
- Use deterministic random (seed-based)
- Batch process large user bases
- Implement draw scheduling (run monthly)

## API Rate Limiting

### Limits
```
Auth endpoints: 10 requests/minute
Score submissions: 5 requests/minute
API endpoints: 60 requests/minute
Webhook retries: 3 attempts with exponential backoff
```

## Caching Strategy

### Edge Caching
- Public pages: s-maxage=3600, stale-while-revalidate
- Draw results: s-maxage=60, stale-while-revalidate
- User-specific data: no-cache

### Database Caching
- Subscription status: cache for 1 hour
- Profile data: cache for 5 minutes
- Draw history: cache for 1 minute

## Monitoring

- Track database query performance
- Monitor API response times
- Alert on rate limit approach
- Monitor draw engine execution times