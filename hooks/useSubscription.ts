'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { SubscriptionStatus } from '@/types'

interface UseSubscriptionReturn {
  status: SubscriptionStatus | null
  isActive: boolean
  isLoading: boolean
}

export function useSubscription(): UseSubscriptionReturn {
  const [status, setStatus] = useState<SubscriptionStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    async function fetchStatus() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setIsLoading(false)
        return
      }

      const { data } = await supabase
        .from('profiles')
        .select('subscription_status')
        .eq('id', user.id)
        .single()

      setStatus(((data as any)?.subscription_status as SubscriptionStatus) ?? null)
      setIsLoading(false)
    }

    void fetchStatus()

    // Real-time subscription status updates
    const channel = supabase
      .channel('subscription-status')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'profiles' },
        (payload: any) => {
          const updated = payload.new as { subscription_status: SubscriptionStatus }
          setStatus(updated.subscription_status)
        }
      )
      .subscribe()

    return () => {
      void supabase.removeChannel(channel)
    }
  }, [supabase])

  return {
    status,
    isActive: status === 'active',
    isLoading,
  }
}
