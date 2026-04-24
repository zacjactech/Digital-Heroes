# Privacy Rules for Digital Heroes

## Data Classification

### Public Data
- Draw results (winners, prizes)
- Charity information
- Pricing plans

### Private Data (RLS Protected)
- User profiles
- Scores
- Subscription details
- Payment history
- Email addresses

### Sensitive Data (Encrypted/Hashed)
- Full names (display only first name)
- Phone numbers
- Addresses

## Privacy Principles

### Data Minimization
- Only collect data necessary for service
- Don't store full payment details locally
- Use Supabase built-in auth (not custom)

### User Control
- Allow profile deletion
- Provide data export capability
- Clear privacy policy
- GDPR compliant

### Access Control
```
User can see:
- Their own scores
- Their own subscription
- Public draw results

Admin can see:
- All user profiles
- All scores
- Subscription status
```

## RLS Policies

### profiles
```sql
-- Users can read their own profile
CREATE POLICY "users_read_own" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "users_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);
```

### scores
```sql
-- Users can read their own scores
CREATE POLICY "users_read_own_scores" ON scores
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create their own scores
CREATE POLICY "users_create_own_scores" ON scores
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## Email Privacy

### Never Expose
- User emails in API responses
- User emails in client-side code
- User emails in console logs

### Use For
- Transactional emails (Resend)
- Admin dashboards (server-side only)

## Cookie Privacy

### Settings
```
- HttpOnly: true
- Secure: true (production)
- SameSite: strict
- Max-Age: Session or 30 days (with consent)
```

## Third-Party Data Sharing

### Never Share
- User data with advertisers
- User emails with third parties
- Payment details with non-essential parties

### Allowed
- Essential service providers (Stripe, Resend)
- Aggregate anonymized statistics