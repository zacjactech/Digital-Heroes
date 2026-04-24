import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/lib/types/database'

export function createClientBrowser() {
  return createBrowserClient<Database['public']>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}