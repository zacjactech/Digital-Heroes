import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe/client'
import { createClient } from '@/lib/supabase/server'
import { 
  handleInvoicePaid, 
  handleSubscriptionUpdated, 
  handleSubscriptionDeleted,
  handleDisputeCreated 
} from '@/lib/stripe/webhook-handlers'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SupabaseClient = any

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.text()
  const signature = request.headers.get('Stripe-Signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing Stripe-Signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Webhook signature verification failed'
    console.error(`Webhook signature verification failed: ${message}`)
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const supabase = await createClient() as SupabaseClient

  const existingEventQuery = await (supabase
    .from('subscription_events')
    .select('id')
    .eq('stripe_event_id', event.id) as { single: () => Promise<{ data: { id: string } | null }> })
    .single()

  if (existingEventQuery.data) {
    return NextResponse.json({ received: true, duplicated: true })
  }

  const eventObject = event.data.object as { customer?: string }
  const userId = eventObject.customer ? await getUserIdFromCustomer(eventObject.customer) : null

  await (supabase
    .from('subscription_events')
    .insert({
      stripe_event_id: event.id,
      event_type: event.type,
      payload: event,
      user_id: userId,
    }) as { then: (cb: (res: { error: Error | null }) => void) => void })
    .then(() => {})

  try {
    switch (event.type) {
      case 'invoice.paid':
        await handleInvoicePaid(supabase, event.data.object as Stripe.Invoice)
        break
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(supabase, event.data.object as Stripe.Subscription)
        break
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(supabase, event.data.object as Stripe.Subscription)
        break
      case 'charge.dispute.created':
        await handleDisputeCreated(supabase, event.data.object as Stripe.Dispute)
        break
      default:
        break
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Webhook handler error'
    console.error(`Webhook handler failed for ${event.type}:`, message)
  }

  return NextResponse.json({ received: true })
}

async function getUserIdFromCustomer(customerId: string): Promise<string | null> {
  const supabase = await createClient() as SupabaseClient
  const profileQuery = await (supabase
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', customerId) as { single: () => Promise<{ data: { id: string } | null }> })
    .single()
  
  return profileQuery.data?.id ?? null
}