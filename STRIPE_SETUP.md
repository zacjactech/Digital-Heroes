# Stripe Setup Checklist for Digital Heroes

Follow these steps in the Stripe Dashboard to prepare the platform for subscriptions.

## 1. Create Products

### Monthly Plan
1. Go to **Products** > **Add product**.
2. **Name**: `Digital Heroes Monthly Subscription`
3. **Description**: `Access to Digital Heroes prize draws and community features.`
4. **Price**: `19.99`
5. **Currency**: `GBP`
6. **Billing period**: `Monthly`
7. **Save product**.
8. Copy the **Price ID** (starts with `price_...`) and add it to your `.env.local` as `STRIPE_MONTHLY_PRICE_ID`.

### Yearly Plan
1. Go to **Products** > **Add product**.
2. **Name**: `Digital Heroes Yearly Subscription`
3. **Description**: `Annual access to Digital Heroes. 2 months free (20% discount).`
4. **Price**: `199.99`
5. **Currency**: `GBP`
6. **Billing period**: `Yearly`
7. **Save product**.
8. Copy the **Price ID** (starts with `price_...`) and add it to your `.env.local` as `STRIPE_YEARLY_PRICE_ID`.

## 2. Configure Webhooks

1. Go to **Developers** > **Webhooks**.
2. Click **Add an endpoint**.
3. **Endpoint URL**: `https://your-domain.com/api/webhooks/stripe`
   - *Note: For local development, use the Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`*
4. **Select events to listen to**:
   - `invoice.paid`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `charge.dispute.created`
5. **Add endpoint**.
6. Copy the **Signing secret** (starts with `whsec_...`) and add it to your `.env.local` as `STRIPE_WEBHOOK_SECRET`.

## 3. Branding & Settings

1. Go to **Settings** > **Branding** and upload the Digital Heroes logo.
2. Go to **Settings** > **Customer portal** and enable:
   - "Allow customers to cancel subscriptions"
   - "Allow customers to switch plans"
   - "Allow customers to update payment methods"

## 4. Environment Variables Checklist

Ensure these are set in your `.env.local`:
```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_MONTHLY_PRICE_ID=price_...
STRIPE_YEARLY_PRICE_ID=price_...
```
