import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { apiSuccess, apiError } from '@/lib/utils'

export async function GET(): Promise<NextResponse> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('draws')
      .select('*')
      .order('draw_date', { ascending: false })

    if (error) throw new Error(`Draws fetch failed: ${error.message}`)

    return NextResponse.json(apiSuccess(data))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json(apiError(message), { status: 500 })
  }
}
