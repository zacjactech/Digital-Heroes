'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getCharities(): Promise<{
  id: string
  name: string
  description: string | null
  image_url: string | null
}[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('charities')
    .select('id, name, description, image_url')
    .eq('is_featured', true)
    .order('name', { ascending: true })

  return data ?? []
}

export async function updateSelectedCharity(
  charityId: string
): Promise<{ error?: string; success?: boolean }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { error } = await supabase
    .from('profiles')
    .update({ charity_id: charityId })
    .eq('id', user.id)

  if (error) return { error: 'Failed to update charity. Please try again.' }

  revalidatePath('/dashboard')
  return { success: true }
}
