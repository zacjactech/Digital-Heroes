import { stripe } from './client'
import { createClient } from '@/lib/supabase/server'
import { SubscriptionStatus, SubscriptionPlan } from '@/lib/types/stripe'

export async function createCheckoutSession(userId: string, priceId: string, returnUrl: string) {
  const supabase = await createClient()
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('email, stripe_customer_id')
    .eq('id', userId)
    .single()

  if (!profile) throw new Error('User profile not found')

  const profileRecord = profile as { email: string; stripe_customer_id: string | null }
  const session = await stripe.checkout.sessions.create({
    customer: profileRecord.stripe_customer_id || undefined,
    customer_email: profileRecord.stripe_customer_id ? undefined : profileRecord.email,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${returnUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${returnUrl}/pricing`,
    metadata: {
      userId: userId,
    },
    subscription_data: {
      metadata: {
        userId: userId,
      },
    },
  })

  return session.url
}

export async function updateSubscriptionStatus(
  customerId: string, 
  status: SubscriptionStatus, 
  endDate: Date,
  plan?: SubscriptionPlan
) {
  const supabase = await createClient()
  
  const updateData: Record<string, unknown> = {
    subscription_status: status,
    subscription_end_at: endDate.toISOString(),
  }

  if (plan) {
    updateData.subscription_plan = plan
  }

  const { error } = await (supabase as unknown as { from: (table: string) => { update: (data: Record<string, unknown>) => { eq: (field: string, value: string) => Promise<{ error: Error | null }> } } })
    .from('profiles')
    .update(updateData)
    .eq('stripe_customer_id', customerId)

  if (error) {
    console.error(`Error updating subscription status for ${customerId}:`, error.message)
    throw error
  }
}

export async function cancelSubscription(customerId: string, atPeriodEnd: boolean = true) {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'active',
    limit: 1,
  })

  if (subscriptions.data.length === 0) return

  const subscriptionId = subscriptions.data[0]?.id
  if (!subscriptionId) return

  if (atPeriodEnd) {
    await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true })
  } else {
    await stripe.subscriptions.cancel(subscriptionId)
  }
}

export async function getCustomerSubscription(customerId: string) {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'all',
    limit: 1,
    expand: ['data.default_payment_method'],
  })

  const sub = subscriptions.data[0]
  if (!sub) return null

  return {
    id: sub.id,
    status: sub.status,
    plan: sub.items.data[0]?.plan.interval === 'year' ? 'yearly' : 'monthly',
    current_period_end: new Date(sub.current_period_end * 1000),
    cancel_at_period_end: sub.cancel_at_period_end,
  }
}