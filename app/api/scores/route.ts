import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { scoreSchema } from '@/lib/validators/score.schema'
import { apiSuccess, apiError } from '@/lib/utils'

type ScoresInsert = {
  user_id: string
  score_value: number
  score_date: string
  notes: string | null
}

const MAX_SCORES_PER_USER = 5

export async function GET(): Promise<NextResponse> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(apiError('Unauthorized'), { status: 401 })
    }

    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .eq('user_id', user.id)
      .order('score_date', { ascending: false })
      .limit(MAX_SCORES_PER_USER)

    if (error) throw new Error(`Score fetch failed: ${error.message}`)

    return NextResponse.json(apiSuccess(data ?? []))
  } catch {
    return NextResponse.json(apiError('Internal server error'), { status: 500 })
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(apiError('Unauthorized'), { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_status')
      .eq('id', user.id)
      .single()

    const profileRecord = profile as { subscription_status?: string } | null
    if (!profileRecord || profileRecord.subscription_status !== 'active') {
      return NextResponse.json(
        apiError('Your subscription is not active', 'SUBSCRIPTION_LAPSED'),
        { status: 403 }
      )
    }

    const body = await request.json()
    const parsed = scoreSchema.safeParse(body)

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? 'Invalid score data'
      return NextResponse.json(apiError(message, 'INVALID_RANGE'), { status: 400 })
    }

    const { value, scoreDate, notes } = parsed.data

    const { data: existing } = await supabase
      .from('scores')
      .select('id')
      .eq('user_id', user.id)
      .eq('score_date', scoreDate)
      .single()

    if (existing) {
      return NextResponse.json(
        apiError('A score for this date already exists', 'DUPLICATE_DATE'),
        { status: 409 }
      )
    }

    const { data: existingScores } = await supabase
      .from('scores')
      .select('id, score_date')
      .eq('user_id', user.id)
      .order('score_date', { ascending: true })

    if ((existingScores?.length ?? 0) >= MAX_SCORES_PER_USER) {
      const oldest = existingScores?.[0] as { id: string } | undefined
      if (oldest) {
        await supabase.from('scores').delete().eq('id', oldest.id)
      }
    }

    const scoreData: ScoresInsert = {
      user_id: user.id,
      score_value: value,
      score_date: scoreDate,
      notes: notes ?? null,
    }

    const { data: inserted, error: insertError } = await (supabase as unknown as { from: (table: string) => { insert: (data: ScoresInsert) => { select: () => { single: () => Promise<{ data: unknown; error: Error | null }> } } } })
      .from('scores')
      .insert(scoreData)
      .select()
      .single()

    if (insertError) throw new Error(`Score insert failed: ${insertError.message}`)

    return NextResponse.json(apiSuccess(inserted), { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json(apiError(message), { status: 500 })
  }
}