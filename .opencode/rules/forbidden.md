# Forbidden Patterns for Digital Heroes

## Absolute Bans

### Never Use
```
- 'any' type (TypeScript strict mode)
- console.log in production code
- eval() or new Function()
- Hardcoded secrets or API keys
- TODO without ticket reference
- setTimeout for critical logic
- InnerHTML (XSS risk)
```

### Never Do
```
- Disable RLS in production
- Expose service role key to client
- Return raw database errors to client
- Skip input validation
- Skip error handling
```

## Code Quality Bans

### Anti-Patterns
```typescript
// ❌ NEVER
const data: any = response.data

// ✅ ALWAYS
const data = response.data as Score[]

// ❌ NEVER
console.log(user.email)

// ✅ ALWAYS
// No logging of PII

// ❌ NEVER
const secret = 'sk_live_xxxxx'

// ✅ ALWAYS
const secret = process.env.STRIPE_SECRET_KEY

// ❌ NEVER
eval(userInput)

// ✅ ALWAYS
// Use safe parsing (JSON.parse, etc.)
```

## Security Violations

### Never
- Store secrets in code
- Log sensitive data
- Use SQL with string concatenation
- Skip CSRF protection
- Use weak random generation
- Trust client input

## Reliability Violations

### Never
- Use empty catch blocks
- Ignore promise rejections
- Use setTimeout(time < 0)
- Skip loading states
- Hardcode URLs (use env)

## Performance Violations

### Avoid
- Unnecessary re-renders
- Fetching in useEffect for SSR data
- Large bundle sizes
- Unoptimized images
- No pagination

## Accessibility Violations

### Never Ship Without
- Alt text on images
- Form labels
- Keyboard navigation
- Focus indicators
- ARIA labels where needed

## Build/Deploy Violations

### Never Deploy Without
- Passing `pnpm lint`
- Passing `pnpm typecheck`
- Successful `pnpm build`
- Environment variables set
- RLS policies active