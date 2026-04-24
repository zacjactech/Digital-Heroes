import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

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
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const supabase = await createClient()

  // Store raw event in audit log
  await (supabase.from('subscription_events' as any) as any).insert({
    stripe_event_id: event.id,
    event_type: event.type,
    payload: event as any,
    processed_at: new Date().toISOString(),
  })

  try {
    switch (event.type) {
      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaid(supabase, invoice)
        break
      }
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(supabase, subscription)
        break
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(supabase, subscription)
        break
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(supabase, invoice)
        break
      }
      default:
        // Unhandled event types — log and return 200 to prevent retries
        break
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Webhook handler error'
    console.error(`Webhook handler failed for ${event.type}:`, message)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

async function handleInvoicePaid(
  supabase: Awaited<ReturnType<typeof createClient>>,
  invoice: Stripe.Invoice
): Promise<void> {
  if (!invoice.customer) return

  const { error } = await (supabase.from('profiles' as any) as any)
    .update({
      subscription_status: 'active',
      stripe_customer_id: invoice.customer as string,
      subscription_renewed_at: new Date().toISOString(),
    })
    .eq('stripe_customer_id', invoice.customer as string)

  if (error) throw new Error(`Failed to activate subscription: ${error.message}`)
}

async function handleSubscriptionUpdated(
  supabase: Awaited<ReturnType<typeof createClient>>,
  subscription: Stripe.Subscription
): Promise<void> {
  const status = subscription.status === 'active' ? 'active' : 'lapsed'

  const { error } = await (supabase.from('profiles' as any) as any)
    .update({ subscription_status: status })
    .eq('stripe_customer_id', subscription.customer as string)

  if (error) throw new Error(`Failed to update subscription: ${error.message}`)
}

async function handleSubscriptionDeleted(
  supabase: Awaited<ReturnType<typeof createClient>>,
  subscription: Stripe.Subscription
): Promise<void> {
  const { error } = await (supabase.from('profiles' as any) as any)
    .update({ subscription_status: 'cancelled' })
    .eq('stripe_customer_id', subscription.customer as string)

  if (error) throw new Error(`Failed to cancel subscription: ${error.message}`)
}

async function handlePaymentFailed(
  supabase: Awaited<ReturnType<typeof createClient>>,
  invoice: Stripe.Invoice
): Promise<void> {
  if (!invoice.customer) return

  const { error } = await (supabase.from('profiles' as any) as any)
    .update({ subscription_status: 'lapsed' })
    .eq('stripe_customer_id', invoice.customer as string)

  if (error) throw new Error(`Failed to mark subscription lapsed: ${error.message}`)
}
