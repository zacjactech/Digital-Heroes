import Stripe from 'stripe'
import { updateSubscriptionStatus } from './utils'
import { SubscriptionPlan } from '@/lib/types/stripe'

export async function handleInvoicePaid(
  _supabase: unknown,
  invoice: Stripe.Invoice
) {
  if (!invoice.customer || !invoice.subscription) return

  let endDate: Date
  
  if (typeof invoice.subscription === 'string') {
    endDate = new Date()
    endDate.setMonth(endDate.getMonth() + 1)
  } else {
    endDate = new Date(invoice.subscription.current_period_end * 1000)
  }
  
  await updateSubscriptionStatus(
    invoice.customer as string,
    'active',
    endDate
  )

  console.log(`Invoice paid for customer ${invoice.customer}. Subscription active until ${endDate}`)
}

export async function handleSubscriptionUpdated(
  _supabase: unknown,
  subscription: Stripe.Subscription
) {
  const customerId = subscription.customer as string
  const endDate = new Date(subscription.current_period_end * 1000)
  const plan: SubscriptionPlan = subscription.items.data[0]?.plan.interval === 'year' ? 'yearly' : 'monthly'
  
  let status: 'active' | 'lapsed' | 'cancelled' = 'active'
  
  if (subscription.status === 'past_due' || subscription.status === 'unpaid') {
    status = 'lapsed'
  } else if (subscription.status === 'canceled') {
    status = 'cancelled'
  }

  await updateSubscriptionStatus(
    customerId,
    status,
    endDate,
    plan
  )

  console.log(`Subscription updated for ${customerId}: ${status} (${plan})`)
}

export async function handleSubscriptionDeleted(
  _supabase: unknown,
  subscription: Stripe.Subscription
) {
  const customerId = subscription.customer as string
  
  await updateSubscriptionStatus(
    customerId,
    'cancelled',
    new Date()
  )

  console.log(`Subscription deleted for customer ${customerId}`)
}

export async function handleDisputeCreated(
  supabase: unknown,
  dispute: Stripe.Dispute
) {
  console.warn(`Dispute created: ${dispute.id} for charge ${dispute.charge}`)

  let customerId: string | null = null
  
  if (dispute.charge && typeof dispute.charge !== 'string') {
    customerId = dispute.charge.customer as string
  }

  if (customerId) {
    await (supabase as { from: (table: string) => { update: (data: Record<string, unknown>) => { eq: (field: string, value: string) => Promise<{ error: Error | null }> } } })
      .from('profiles')
      .update({ subscription_status: 'inactive' })
      .eq('stripe_customer_id', customerId)
  }
}