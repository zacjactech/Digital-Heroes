'use server'

import { createCheckoutSession as createSession } from '@/lib/stripe/utils'
export async function createCheckoutSession(userId: string, priceId: string, returnUrl: string) {
  return createSession(userId, priceId, returnUrl)
}
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function startCheckout(priceId: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/register?next=/pricing')
  }

  const origin = (await headers()).get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  
  try {
    const checkoutUrl = await createSession(user.id, priceId, origin)
    if (checkoutUrl) {
      redirect(checkoutUrl)
    }
  } catch (err) {
    console.error('Failed to create checkout session:', err)
    throw new Error('Could not initialize checkout. Please try again.')
  }
}
