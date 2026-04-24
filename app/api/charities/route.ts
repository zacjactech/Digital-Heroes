import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { apiSuccess, apiError } from '@/lib/utils'

export async function GET(): Promise<NextResponse> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('charities')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true })

    if (error) throw new Error(`Charities fetch failed: ${error.message}`)

    return NextResponse.json(apiSuccess(data))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json(apiError(message), { status: 500 })
  }
}
